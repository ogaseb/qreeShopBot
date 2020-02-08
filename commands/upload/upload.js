const {
  third_party: { getRandomMeme }
} = require("../../helpers/index");
const { findGame } = require("../../controllers/qree_items");
const {
  createInitialObjectUpload
} = require("./functions/createInitialObjectUpload");
const { QrCollector } = require("../../classess/collector/collector");

module.exports.handleGameUpload = async function(
  messageArguments,
  receivedMessage,
  client
) {
  let messagesIdArray = [];
  try {
    if (messageArguments.length !== 5) {
      return receivedMessage.channel.send(
        `invalid arguments count for upload command`
      );
    }
    messagesIdArray.push(receivedMessage.id);

    const meme = await getRandomMeme("head-pat-anime");
    const waitingMessage = await receivedMessage.channel.send(
      `wait a moment...`,
      {
        files: [meme]
      }
    );

    const qrGameObject = await createInitialObjectUpload(
      messageArguments,
      receivedMessage
    );
    const searchResult = await findGame(qrGameObject.name);
    const text =
      searchResult.length === 0
        ? `\`\`\`diff\n+ This is how it will look, save in database? Type 'yes'/'no'\n\`\`\``
        : `\`\`\`diff\n- I FOUND THE GAMES WITH SIMILAR NAME, CHECK THEM BEFORE SAYING 'yes' BY TYPING 'search'"\n\`\`\`\`\`\`diff\n+ This is how it will look, save in database? Type 'yes'/'no' or 'search' if you want to check about what games I was talking about :)"\n\`\`\``;

    await receivedMessage.channel.messages.get(waitingMessage.id).delete();
    receivedMessage.channel
      .send(
        `\`\`\`\nLink: ${qrGameObject.qrLink}\n\nName: ${qrGameObject.name}\nPlatform: ${qrGameObject.platform}\nRegion: ${qrGameObject.region}\nSize: ${qrGameObject.size}\nUploader: ${qrGameObject.uploaderName}\`\`\`${text}`
      )
      .then(message => {
        messagesIdArray.push(message.id);
      });

    return new QrCollector(receivedMessage, "upload", {
      client: client,
      qrGameObject: qrGameObject,
      searchResult: searchResult,
      messagesIdArray: messagesIdArray
    }).init();
  } catch (e) {
    console.log(e);
    await receivedMessage.channel.send(
      `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
    );
  }
};
