require("dotenv").config();
const { editQree, findGameToEdit } = require("../../controllers/qree_items");
const { QrCollector } = require("../../classess/collector/collector");
const {
  createInitialObjectEdit
} = require("./functions/createInitialObjectEdit");

module.exports.editQrData = async function(messageArguments, receivedMessage) {
  let messagesIdArray = [];
  try {
    messagesIdArray.push(receivedMessage.id);
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
      receivedMessage.channel
        .send(
          `\`\`\`\nLink: ${qrLink}\n\nName: ${name}\nPlatform: ${platform}\nRegion: ${region}\nSize: ${size}\nUploader: ${uploaderName}\`\`\`\`\`\`Is this the game you wish to edit? type 'yes'/'no'\`\`\``,
          {
            files: [qrImageUrl]
          }
        )
        .then(message => {
          messagesIdArray.push(message.id);
        });

      await new QrCollector(receivedMessage, "edit", {
        messagesIdArray: messagesIdArray
      })
        .collect()
        .end(id, game);
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
