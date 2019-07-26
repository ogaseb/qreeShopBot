require("dotenv").config();
import { Client, MessageCollector } from "discord.js";
import jimp from "jimp";
import fetch from "node-fetch";
import QRReader from "qrcode-reader";
import {
  parseGDriveLink,
  parseDropboxLink,
  createASCIIQrCode,
  regexes,
  createEmbeddedAnswer,
  checkIfDM,
  createEmbeddedHelper,
  limitlessFetchMessages
} from "./helpers/helpers";
import { initializeDb } from "./models/database";
import { createQree, findGame, approxQrCount } from "./db/db_qree";

void (async function() {
  try {
    await initializeDb();
    console.log("DB -> init DB");
  } catch (e) {
    console.log(e);
  }

  try {
    await client.login(process.env.BOT_TOKEN);
  } catch (e) {
    console.log(e);
  }
})();

const client = new Client();
let botInvoker = process.env.BOT_DEFAULT_INVOKE;
let serverInvokers = new Map();

client.on("ready", async () => {
  console.log("On Discord!");
  console.log("Connected as " + client.user.tag);
  console.log("Servers:");
  client.guilds.forEach(guild => {
    serverInvokers.set(guild.id, botInvoker);
    console.log(" - " + guild.id);
    guild.channels.forEach(channel => {
      console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
    });

    console.log(serverInvokers);
  });

  setInterval(async () => {
    const qrCount = await approxQrCount();
    qrCount.rows.map(async ({ count }) => {
      await client.user.setActivity(`QR Codes count: ${count}`, {
        type: "PLAYING"
      });
    });
  }, 60000);
});

client.on("message", receivedMessage => {
  if (receivedMessage.author === client.user) {
    // Prevent bot from responding to its own messages
    return;
  }

  if (receivedMessage.channel.type === "dm") {
    if (receivedMessage.content.startsWith(`${botInvoker}`)) {
      processCommand(receivedMessage);
    } else {
      return receivedMessage.channel.send(
        `You need to specify which command you want to use type "!qre help" to display available commands`
      );
    }
  } else {
    if (
      receivedMessage.content.startsWith(
        `${serverInvokers.get(receivedMessage.guild.id)}`
      )
    ) {
      processCommand(receivedMessage);
    }
  }
});

function processCommand(receivedMessage) {
  let fullCommand, primaryCommand;

  checkIfDM(receivedMessage)
    ? (fullCommand = receivedMessage.content.substr(botInvoker.length + 1))
    : (fullCommand = receivedMessage.content.substr(
        serverInvokers.get(receivedMessage.guild.id).length + 1
      ));

  const messageArguments = fullCommand.match(regexes.ARGUMENTS);

  if (messageArguments !== null && messageArguments.length) {
    primaryCommand = messageArguments[0]; // The first word directly after the exclamation is the command
  }

  if (
    primaryCommand === "" ||
    primaryCommand === null ||
    primaryCommand === undefined
  ) {
    checkIfDM(receivedMessage)
      ? receivedMessage.channel.send(
          `You need to specify which command you want to use type "!qre help" to display available commands`
        )
      : receivedMessage.channel.send(
          `You need to specify which command you want to use type "${serverInvokers.get(
            receivedMessage.guild.id
          )} help" to display available commands`
        );
    return;
  }

  if (primaryCommand === "help") {
    return createEmbeddedHelper(serverInvokers, receivedMessage).build();
  }

  if (!checkIfDM(receivedMessage)) {
    if (
      process.env.BOT_PERMISSIONS_GUILD.includes(receivedMessage.guild.id) &&
      receivedMessage.member.roles.some(r =>
        process.env.BOT_PERMISSIONS_ROLES.includes(r.name)
      )
    ) {
      if (primaryCommand === "upload") {
        return handleGameUpload(messageArguments, receivedMessage);
      }

      if (primaryCommand === "invoke") {
        return changeInvokeCommand(messageArguments, receivedMessage);
      }

      if (primaryCommand === "scrap") {
        return scrapChannelForQrCodes(messageArguments, receivedMessage);
      }

      if (primaryCommand === "edit") {
        return handleGameEdit(messageArguments, receivedMessage);
      }
    } else {
      return receivedMessage.channel.send(
        "You have no permissions to use this commands"
      );
    }
  }

  if (primaryCommand === "search") {
    return searchGame(messageArguments, receivedMessage);
  }

  return receivedMessage.channel.send(`Command not found`);
}

async function scrapChannelForQrCodes(messageArguments, receivedMessage) {
  if (receivedMessage.channel.type === "dm") {
    return receivedMessage.channel.send(
      `This command is available only in servers`
    );
  }

  limitlessFetchMessages(receivedMessage.channel).then(async messages => {
    for (const item of messages) {
      console.log(messages.author.name);
      if (!!item.attachments.size) {
        const metaInformation = item.content
          .match(regexes.SCRAPER_TITLE)
          .map(Function.prototype.call, String.prototype.trim)
          .filter(function(el) {
            if (el !== null && el !== " ") return el;
          });
        const name = metaInformation[0];
        metaInformation.shift();

        const regionIndex = metaInformation.findIndex(value =>
          regexes.REGIONS.test(value)
        );
        const platformIndex = metaInformation.findIndex(value =>
          regexes.PLATFORMS.test(value)
        );
        const sizeIndex = metaInformation.findIndex(value =>
          regexes.SIZE.test(value)
        );

        const res = await fetch(
          `${item.attachments.values().next().value.proxyURL}`
        );
        const buffer = await res.buffer();
        const img = await jimp.read(buffer);
        const qr = new QRReader();

        const value = await new Promise((resolve, reject) => {
          qr.callback = (err, v) => (err != null ? reject(err) : resolve(v));
          qr.decode(img.bitmap);
        });

        const obj = {
          name: name.replace(/^"(.*)"$/, "$1").replace(/'/g, "''"),
          qr_link: value.result,
          qr_data: await createASCIIQrCode(value.result),
          platform: metaInformation[platformIndex] || "N/A",
          region: metaInformation[regionIndex] || "N/A",
          size: metaInformation[sizeIndex] || "N/A",
          uploader_discord_id: item.author.id,
          uploader_name: messages.author.username
        };

        const { rows } = await findGame(obj.name);
        console.log(!rows.length);
        if (!rows.length) {
          try {
            await createQree(
              obj.qr_data,
              obj.qr_link,
              obj.name,
              obj.platform,
              obj.region,
              obj.size,
              obj.uploader_discord_id,
              obj.uploader_name
            );
            await receivedMessage.author.send(
              "Saving in database! " + obj.name
            );
          } catch (e) {
            console.log(e);
            await receivedMessage.author.send(
              "something went wrong, send it to developer: \n" +
                "```diff\n- " +
                e +
                "```"
            );
          }
        } else {
          await receivedMessage.author.send("Game is already in DB" + obj.name);
        }
      }
    }

    return receivedMessage.channel.send(`fetching messages`);
  });

  if (messageArguments.length > 3) {
    return receivedMessage.channel.send(
      `Too much arguments for invoke command`
    );
  }

  if (messageArguments[1]) {
    serverInvokers.set(receivedMessage.guild.id, messageArguments[1]);
    return receivedMessage.channel.send(
      `Successfully changed your invoke command`
    );
  }
}

function changeInvokeCommand(messageArguments, receivedMessage) {
  if (receivedMessage.channel.type === "dm") {
    return receivedMessage.channel.send(
      `This command is available only in servers`
    );
  }

  if (messageArguments.length > 3) {
    return receivedMessage.channel.send(
      `Too much arguments for invoke command`
    );
  }

  if (messageArguments[1]) {
    serverInvokers.set(receivedMessage.guild.id, messageArguments[1]);
    return receivedMessage.channel.send(
      `Successfully changed your invoke command`
    );
  }
}

async function handleGameUpload(messageArguments, receivedMessage) {
  if (messageArguments.length !== 6) {
    return receivedMessage.channel.send(
      `invalid arguments count for upload command`
    );
  }
  const urlIndex = messageArguments.findIndex(value => regexes.URL.test(value));

  if (!urlIndex) {
    return receivedMessage.channel.send(
      `invalid arguments \`URL\` for upload command`
    );
  }
  const titleIndex = messageArguments.findIndex(value =>
    regexes.TITLE.test(value)
  );
  if (!titleIndex) {
    return receivedMessage.channel.send(
      `invalid arguments \`TITLE\` for upload command`
    );
  }
  const regionIndex = messageArguments.findIndex(value =>
    regexes.REGIONS.test(value)
  );
  if (!titleIndex) {
    return receivedMessage.channel.send(
      `invalid arguments \`REGION\` for upload command`
    );
  }
  const platformIndex = messageArguments.findIndex(value =>
    regexes.PLATFORMS.test(value)
  );
  if (!platformIndex) {
    return receivedMessage.channel.send(
      `invalid arguments \`PLATFORM\` for upload command`
    );
  }
  const sizeIndex = messageArguments.findIndex(value =>
    regexes.SIZE.test(value)
  );
  if (!sizeIndex) {
    return receivedMessage.channel.send(
      `invalid arguments \`SIZE\` for upload command`
    );
  }

  if (messageArguments[urlIndex].match(regexes.GDRIVE)) {
    messageArguments[urlIndex] = parseGDriveLink(messageArguments[urlIndex]);
  } else if (messageArguments[urlIndex].match(regexes.DROPBOX)) {
    messageArguments[urlIndex].slice(-1) === "0"
      ? (messageArguments[urlIndex] = parseDropboxLink(
          messageArguments[urlIndex]
        ))
      : null;
  }

  const obj = {
    name: messageArguments[titleIndex]
      .replace(/^"(.*)"$/, "$1")
      .replace(/'/g, "''"),
    qr_link: messageArguments[urlIndex],
    qr_data: await createASCIIQrCode(messageArguments[urlIndex]),
    platform: messageArguments[platformIndex],
    region: messageArguments[regionIndex],
    size: messageArguments[sizeIndex],
    uploader_discord_id: receivedMessage.author.id,
    uploader_name: receivedMessage.author.username
  };

  const { rows } = await findGame(obj.name);
  const text =
    rows.length === 0
      ? "```diff\n" +
        "+ This is how it will look, save in database? Type 'yes'/'no'" +
        "\n```"
      : "```diff\n" +
        "+ There are games with similar name, check by searching them first before uploading" +
        "\n```" +
        "```diff\n" +
        "+ This is how it will look, save in database? Type 'yes'/'no' or 'search' if you want to check about what games I was talking about :)" +
        "\n```";

  await receivedMessage.channel.send(
    "```" +
      obj.qr_data +
      "\nLink: " +
      obj.qr_link +
      "\n\nName: " +
      obj.name +
      "\nPlatform: " +
      obj.platform +
      "\nRegion: " +
      obj.region +
      "\nSize: " +
      obj.size +
      "\nUploader: " +
      obj.uploader_name +
      "```" +
      text
  );

  const collector = new MessageCollector(
    receivedMessage.channel,
    m => m.author.id === receivedMessage.author.id,
    { time: 60000 }
  );
  collector.on("collect", async message => {
    if (message.content === "yes") {
      try {
        await receivedMessage.channel.send("Saving in database!");
        await createQree(
          obj.qr_data,
          obj.qr_link,
          obj.name,
          obj.platform,
          obj.region,
          obj.size,
          obj.uploader_discord_id,
          obj.uploader_name
        );
      } catch (e) {
        console.log(e);
        await receivedMessage.channel.send(
          "something went wrong, send it to developer: \n" +
            "```diff\n- " +
            e +
            "```"
        );
      }

      collector.stop();
    } else if (message.content === "no") {
      try {
        await receivedMessage.channel.send("Ok try again later :P");
      } catch (e) {
        console.log(e);
        await receivedMessage.channel.send(
          "something went wrong, send it to developer: \n" +
            "```diff\n- " +
            e +
            "```"
        );
      }
      collector.stop();
    } else if (message.content === "search") {
      try {
        await receivedMessage.channel.send(
          "```Ok, displaying games that I have found you can type 'yes'/'no' still```"
        );

        const QrCodesSearchResults = createEmbeddedAnswer(
          rows,
          receivedMessage
        );
        await QrCodesSearchResults.build();
      } catch (e) {
        console.log(e);
        await receivedMessage.channel.send(
          "something went wrong, send it to developer: \n" +
            "```diff\n- " +
            e +
            "```"
        );
      }
    }
  });

  collector.on("end", async () => {
    await receivedMessage.channel.send("upload session ended");
  });
}

async function searchGame(messageArguments, receivedMessage) {
  try {
    // const games = await findGame(messageArguments[1])
    console.log(messageArguments);
    if (messageArguments.length !== 2) {
      return await receivedMessage.channel.send(
        `invalid arguments for search command`
      );
    }

    const name = messageArguments[1].replace(/^"(.*)"$/, "$1");
    const { rows } = await findGame(name);
    if (rows.length === 0) {
      await receivedMessage.author.send(
        `I didn't find anything called \`${messageArguments[1]}\``
      );
    } else {
      const QrCodesSearchResults = createEmbeddedAnswer(rows, receivedMessage);
      await QrCodesSearchResults.build();
    }
  } catch (e) {
    console.log(e);
    await receivedMessage.channel.send(
      "something went wrong, send it to developer: \n" +
        "```diff\n- " +
        e +
        "```"
    );
  }
}

async function handleGameEdit(messageArguments, receivedMessage) {
  try {
    // const games = await findGame(messageArguments[1])
    console.log(messageArguments);
    const id = parseInt(messageArguments[1]);
    // if (messageArguments.length !== 2) {
    //   return await receivedMessage.channel.send(
    //     `invalid arguments for search command`
    //   );
    // }
    //
    // const name = messageArguments[1].replace(/^"(.*)"$/, "$1");
    // const { rows } = await findGame(name);
    // if (rows.length === 0) {
    //   await receivedMessage.author.send(
    //     `I didn't find anything called \`${messageArguments[1]}\``
    //   );
    // } else {
    //   const QrCodesSearchResults = createEmbeddedAnswer(rows, receivedMessage);
    //   await QrCodesSearchResults.build();
    // }
  } catch (e) {
    console.log(e);
    await receivedMessage.channel.send(
      "something went wrong, send it to developer: \n" +
        "```diff\n- " +
        e +
        "```"
    );
  }
}
