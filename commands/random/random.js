const { getWholeDB } = require("../../controllers/qre_items");
const {
  embedded: { createRandomEmbed }
} = require("../../helpers/index");

module.exports.randomGame = async function(receivedMessage) {
  try {
    const games = await getWholeDB();
    if (games.length !== 0) {
      const response = await receivedMessage.channel.send(`wait a moment...`);
      const loadingMessageId = response.id;

      const QrCodesSearchResults = await createRandomEmbed(
        games[Math.floor(Math.random() * games.length)],
        receivedMessage,
        "",
        loadingMessageId
      );
      await QrCodesSearchResults.build();
    } else {
    }
  } catch (e) {
    console.log(e);
    await receivedMessage.channel.send(
      `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
    );
  }
};
