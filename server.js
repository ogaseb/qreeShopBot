require("dotenv").config();
import { Client, MessageCollector } from "discord.js";
import {
  parseGDriveLink,
  parseDropboxLink,
  createASCIIQrCode,
  regexes,
  createEmbeddedAnswer,
  checkIfDM,
  createEmbeddedHelper
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
  let link;
  if (messageArguments.length !== 6) {
    return receivedMessage.channel.send(
      `invalid arguments count for upload command`
    );
  }

  if (messageArguments[1].match(regexes.GDRIVE)) {
    link = parseGDriveLink(messageArguments[1]);
  } else if (messageArguments[1].match(regexes.DROPBOX)) {
    messageArguments[1].slice(-1) === "0"
      ? (link = parseDropboxLink(messageArguments[1]))
      : (link = messageArguments[1]);
  } else {
    link = messageArguments[1];
  }

  if (!messageArguments[4].match(regexes.REGIONS)) {
    return receivedMessage.channel.send(
      `invalid region argument for upload command`
    );
  }

  if (link.match(regexes.URL)) {
    const qr = createASCIIQrCode(link);
    const name = messageArguments[2].replace(/^"(.*)"$/, "$1");

    const { rows } = await findGame(name);
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
        qr +
        "\nLink: " +
        link +
        "\n\nName: " +
        name +
        "\nPlatform: " +
        messageArguments[3] +
        "\nRegion: " +
        messageArguments[4] +
        "\nSize: " +
        messageArguments[5] +
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
            qr,
            link,
            name,
            messageArguments[3],
            messageArguments[4],
            messageArguments[5],
            receivedMessage.author.id
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
          receivedMessage.channel.send(
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
  } else {
    return receivedMessage.channel.send(`specify a valid url`);
  }
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
