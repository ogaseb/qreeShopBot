require("dotenv").config();
const { editQree, findGameToEdit } = require("../../controllers/qre_items");
const { QrCollector } = require("../../classess/collector/collector");
const { createInitialObjectEdit } = require("./createInitialObjectEdit");

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

      await new QrCollector(receivedMessage, "edit")
        .collect()
        .end(async diffArguments => {
          const editGameObject = await createInitialObjectEdit(
            diffArguments,
            receivedMessage,
            game
          );
          console.log(id);
          await editQree(id, editGameObject, receivedMessage);
          const check = await findGameToEdit(id);
          await receivedMessage.channel.send(
            `\`\`\`\nUPDATED QR:\nLink: ${check.qrLink}\n\nName: ${check.name}\nPlatform: ${check.platform}\nRegion: ${check.region}\nSize: ${check.size}\nUploader: ${check.uploaderName}\`\`\``,
            {
              files: [check.qrImageUrl]
            }
          );
        });
    } else {
      await receivedMessage.channel.send(`Edit session ended`);
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
