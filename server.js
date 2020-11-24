require("dotenv").config();
require("@sentry/node").init({ dsn: process.env.SENTRY_URL });
const { getHours, getMinutes } = require("date-fns");
const { Client } = require("discord.js");
const {
  changeInvokeCommand,
  handleGameUpload,
  searchGame,
  editQrData,
  sendHelp,
  makeQrImagesFromDB,
  checkUrlsForStatus,
  updateSizeOfFile,
  sendHeadPat,
  findCoversForGames,
  getRandomGame
} = require("./commands/index");
const {
  validation: { validatePermissions, validateGuilds, validateAdmin, checkIfDM },
  other: { regexes }
} = require("./helpers/index");
const { approxQrCount } = require("./controllers/qree_items");

const client = new Client();
let botInvoker = process.env.BOT_DEFAULT_INVOKE;
let serverInvokers = new Map();

void (async function() {
  try {
    await client.login(process.env.BOT_TOKEN);
  } catch (e) {
    console.log(e);
  }
})();

client.on("ready", async () => {
  console.log("On Discord!");
  console.log("Connected as " + client.user.tag);
  // console.log("Servers:");
  // client.guilds.forEach(guild => {
  //   serverInvokers.set(guild.id, botInvoker);
  //   console.log(" - " + guild.id);
  //   guild.channels.forEach(channel => {
  //     console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
  //   });
  //
  //   console.log(serverInvokers);
  // });

  setInterval(async () => {
    const qrCount = await approxQrCount();
    await client.user.setActivity(`QR Codes count: ${qrCount.count}`, {
      type: "WATCHING"
    });

    if (getHours(new Date()) === 18 && getMinutes(new Date()) === 0) {
      await urlStatus(client);
    }
  }, 1000 * 60);
});

client.on("message", receivedMessage => {
  if (receivedMessage.author === client.user) {
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

  if (!primaryCommand) {
    checkIfDM(receivedMessage)
      ? receivedMessage.channel.send(
          `You need to specify which command you want to use type "!qre help" to display available commands`
        )
      : receivedMessage.channel.send(
          `You need to specify which command you want to use type "${serverInvokers.get(
            receivedMessage.guild.id
          )} help" to display available commands`
        );
  }

  if (primaryCommand === "help") {
    return sendHelp(serverInvokers, receivedMessage).build();
  }

  if (primaryCommand === "search") {
    return searchGame(fullCommand, receivedMessage);
  }

  if (primaryCommand === "random") {
    return getRandomGame(receivedMessage);
  }

  if (primaryCommand === "headpat") {
    validateGuilds(receivedMessage)
      ? sendHeadPat(messageArguments, receivedMessage)
      : null;
  }

  if (primaryCommand === "upload") {
    if (validatePermissions(receivedMessage)) {
      return handleGameUpload(messageArguments, receivedMessage, client);
    } else {
      return receivedMessage.channel.send(
        `You need to have permissions to use this command`
      );
    }
  }

  if (validateAdmin(receivedMessage)) {
    if (primaryCommand === "invoke") {
      return changeInvokeCommand(
        messageArguments,
        receivedMessage,
        serverInvokers
      );
    }

    // if (primaryCommand === "scrap") {
    //   return scrapChannelForQrCodes(messageArguments, receivedMessage);
    // }

    if (primaryCommand === "images") {
      return makeQrImagesFromDB(messageArguments, receivedMessage);
    }

    if (primaryCommand === "edit") {
      return editQrData(messageArguments, receivedMessage);
    }

    if (primaryCommand === "checkurls") {
      return checkUrlsForStatus(client, receivedMessage);
    }

    if (primaryCommand === "updatesize") {
      return updateSizeOfFile(client);
    }

    if (primaryCommand === "findcovers") {
      return findCoversForGames(client);
    }
  }

  return receivedMessage.channel.send(
    `You need to specify which command you want to use type "!qre help" to display available commands`
  );
}
