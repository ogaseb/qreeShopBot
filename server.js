require("dotenv").config();
import { Client } from "discord.js";
import {
  scrapChannelForQrCodes,
  changeInvokeCommand,
  handleGameUpload,
  searchGame,
  handleGameEdit,
  createEmbeddedHelper,
  makeQrImagesfromDB,
  urlStatus,
  updateSize,
  headPat
} from "./src/commands/index";
import {
  regexes,
  checkIfDM,
  validateGuilds,
  validatePermissions,
  validateAdmin
} from "./src/helpers/helpers";
import { approxQrCount } from "./src/db/db_qree";

process.on("unhandledRejection", (err, p) => {
  console.log("An unhandledRejection occurred");
  console.log(`Rejected Promise: ${p}`);
  console.log(`Rejection: ${err}`);
});

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
    await client.user.setActivity(`QR Codes count: ${qrCount.count}`, {
      type: "PLAYING"
    });
  }, 60000);

  setInterval(async () => {
    await urlStatus(client);
  }, 1000 * 60 * 60 * 24);
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

  console.log(primaryCommand);

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
    return createEmbeddedHelper(serverInvokers, receivedMessage).build();
  }

  if (primaryCommand === "search") {
    return searchGame(fullCommand, receivedMessage);
  }

  if (primaryCommand === "headpat") {
    validateGuilds(receivedMessage)
      ? headPat(messageArguments, receivedMessage)
      : null;
  }

  if (primaryCommand === "upload") {
    if (
      validateGuilds(receivedMessage) &&
      validatePermissions(receivedMessage)
    ) {
      return handleGameUpload(messageArguments, receivedMessage, client);
    } else {
      return receivedMessage.channel.send(
        `You need to have permissions to use this command`
      );
    }
  }

  if (validateGuilds(receivedMessage) && validateAdmin(receivedMessage)) {
    if (primaryCommand === "invoke") {
      return changeInvokeCommand(
        messageArguments,
        receivedMessage,
        serverInvokers
      );
    }

    if (primaryCommand === "scrap") {
      return scrapChannelForQrCodes(messageArguments, receivedMessage);
    }

    if (primaryCommand === "images") {
      return makeQrImagesfromDB(messageArguments, receivedMessage);
    }

    if (primaryCommand === "edit") {
      return handleGameEdit(messageArguments, receivedMessage);
    }

    if (primaryCommand === "checkurls") {
      return urlStatus(client);
    }

    if (primaryCommand === "updatesize") {
      return updateSize(client);
    }
  }

  return receivedMessage.channel.send(
    `You need to specify which command you want to use type "!qre help" to display available commands`
  );
}
