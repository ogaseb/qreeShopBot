require("dotenv").config();
const { editQree, findGameToEdit } = require("../../controllers/qre_items");
const { MessageCollector } = require("discord.js");
const {
  other: { checkFileSize, filteredRegexes, regexes },
  qr: { createDataURLQrCode, parseURL }
} = require("../../helpers/index");
const imageDataURI = require("image-data-uri");

const createInitialObject = async (messageArguments, receivedMessage, game) => {
  let finalObject = {
    name: null,
    qrLink: null,
    qrImageUrl: null,
    platform: null,
    region: null,
    size: null,
    uploaderDiscordId: game.uploaderDiscordId,
    uploaderName: game.uploaderName
  };

  const regexesObj = await filteredRegexes([
    "URL",
    "TITLE",
    "REGIONS",
    "PLATFORMS",
    "SIZE"
  ]);

  let foundArgsObj = {};
  for (const regex in regexesObj) {
    const itemIndex = await messageArguments.findIndex(value =>
      regexesObj[regex].test(value)
    );
    if (itemIndex === -1) {
      await receivedMessage.channel.send(
        `argument \`${regex}\` is missing continue...`
      );
    } else {
      foundArgsObj[regex] = messageArguments[itemIndex];
      messageArguments.splice(itemIndex, 1);
      await receivedMessage.channel.send(
        `argument \`${regex}\` is present! : \`${foundArgsObj[regex]}\``
      );
    }
  }

  foundArgsObj.TITLE
    ? (finalObject.name = foundArgsObj.TITLE.replace(/['"]+/g, ""))
    : (finalObject.name = game.name);
  foundArgsObj.URL
    ? (finalObject.qrLink = parseURL(foundArgsObj.URL))
    : (finalObject.qrLink = game.qrLink);
  foundArgsObj.PLATFORMS
    ? (finalObject.platform = foundArgsObj.PLATFORMS)
    : (finalObject.platform = game.platform);
  foundArgsObj.REGIONS
    ? (finalObject.region = foundArgsObj.REGIONS)
    : (finalObject.region = game.region);
  foundArgsObj.SIZE
    ? (finalObject.size = foundArgsObj.SIZE)
    : (finalObject.size = game.size);
  if (foundArgsObj.URL && !foundArgsObj.SIZE) {
    finalObject.size = await checkFileSize(foundArgsObj.URL);
  }
  foundArgsObj.URL
    ? (finalObject.qrImageUrl = await createImageUrlFromFile(
        finalObject,
        receivedMessage,
        foundArgsObj.URL
      ))
    : (finalObject.qrImageUrl = game.qrImageUrl);

  const isEmpty = Object.values(finalObject).every(x => x === null);

  if (isEmpty) {
    await receivedMessage.channel.send(
      `something went wrong with editing data for qr code`
    );
  } else {
    return finalObject;
  }
};

const createImageUrlFromFile = async (finalObject, receivedMessage, url) => {
  let string =
    finalObject.name +
    finalObject.platform +
    finalObject.region +
    finalObject.uploaderDiscordId;
  string = string.replace(/[^a-z0-9]/gim, "").replace(/\s+/g, "");
  await imageDataURI.outputFile(
    await createDataURLQrCode(url),
    "./img/" + string + ".jpg"
  );
  const imageMsg = await receivedMessage.channel.send("", {
    files: ["./img/" + string + ".jpg"]
  });
  return imageMsg.attachments.values().next().value.proxyURL;
};

module.exports.editQrData = async function(messageArguments, receivedMessage) {
  try {
    const id = parseInt(messageArguments[1]);
    const game = await findGameToEdit(id);
    const {
      qrImageUrl,
      qrLink,
      name,
      platform,
      region,
      size,
      uploaderName
    } = game;

    if (typeof game.dataValues != "undefined") {
      await receivedMessage.channel.send(
        `\`\`\`\nLink: ${qrLink}\n\nName: ${name}\nPlatform: ${platform}\nRegion: ${region}\nSize: ${size}\nUploader: ${uploaderName}\`\`\`\`\`\`Is this the game you wish to edit? type 'yes'/'no'\`\`\``,
        {
          files: [qrImageUrl]
        }
      );

      const collector = new MessageCollector(
        receivedMessage.channel,
        m => m.author.id === receivedMessage.author.id,
        { time: 120000 }
      );

      await collector.on("collect", async message => {
        if (message.content.toLowerCase() === "yes") {
          await receivedMessage.channel.send(
            `\`\`\`please type all the information you want to edit, remember that title NEEDS to be in quotation marks. You can type all info you want to edit in one or more messages.\`\`\`\`\`\`type \`end\` if you want to finish\`\`\``
          );
        }
        if (message.content.toLowerCase() === "no") {
          collector.stop();
          await receivedMessage.channel.send(
            "``` Ok, will not do anything with it ```"
          );
        }

        if (message.content.toLowerCase() === "end") {
          collector.stop();
        }
      });

      await collector.on("end", async collected => {
        let collectedArguments = [];
        collected.forEach(item => {
          collectedArguments.push(item.content);
        });

        const diffArguments = await collectedArguments
          .filter(
            function(e) {
              return this.indexOf(e.toLowerCase()) < 0;
            },
            ["end", "yes", "no"]
          )
          .join(" ")
          .match(regexes.ARGUMENTS);

        if (diffArguments && collectedArguments[0].toLowerCase() === "yes") {
          const editGameObject = await createInitialObject(
            diffArguments,
            receivedMessage,
            game
          );
          await editQree(id, editGameObject, receivedMessage);

          const check = await findGameToEdit(id);

          await receivedMessage.channel.send(
            `\`\`\`\nLink: ${check.qrLink}\n\nName: ${check.name}\nPlatform: ${check.platform}\nRegion: ${check.region}\nSize: ${check.size}\nUploader: ${check.uploaderName}\`\`\``,
            {
              files: [check.qrImageUrl]
            }
          );
        } else {
          await receivedMessage.channel.send(`Edit session ended`);
        }
      });
    } else {
      await receivedMessage.channel.send("cant find it in database");
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
};
