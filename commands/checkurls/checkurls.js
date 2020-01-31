const { getWholeDB } = require("../../controllers/qree_items");
const axios = require("axios");
const progress = require("progress-string");

module.exports.checkUrlsForStatus = async function(client, receivedMessage) {
  await client.channels
    .get("670579373623214102")
    .send(`Checking urls started... I will do it every 24 hours`);
  const rows = await getWholeDB();
  let loading = await client.channels
    .get("670579373623214102")
    .send(`Checking...`);
  let bar = progress({
    width: 60,
    total: rows.length,
    style: function(complete, incomplete) {
      return "[" + complete + ">" + incomplete + "]";
    }
  });
  let counter = 0;
  for (const { id, qrLink, name, uploaderDiscordId } of rows) {
    try {
      const link = await axios.head(qrLink, { timeout: 30000 });
      if (
        /\b(?:4[0-9]{2}|5[0-4][0-9]|550)\b/.test(
          link.response.status.toString()
        )
      ) {
        await client.channels
          .get("670579373623214102")
          .send(
            `${qrLink} sends ${link.response.status} respond code (not found or other error) for game: ${name}. DB ID for updating: ${id} . <@${uploaderDiscordId}>`
          );
      }
      counter++;
      await receivedMessage.channel.messages
        .get(loading.id)
        .edit(`${bar(counter)} (${counter}/${rows.length})`);
    } catch (e) {
      if (e.response) {
        if (
          /\b(?:4[0-9]{2}|5[0-4][0-9]|550)\b/.test(e.response.status.toString())
        ) {
          await client.channels
            .get("670579373623214102")
            .send(
              `${qrLink} sends ${e.response.status} respond code (not found or other error) for game: ${name}. DB ID for updating: ${id} . <@${uploaderDiscordId}>`
            );
        }
      }
      counter++;
      await receivedMessage.channel.messages
        .get(loading.id)
        .edit(`${bar(counter)} (${counter}/${rows.length})`);
    }
  }
  await client.channels
    .get("670579373623214102")
    .send(`All games have been scanned!`);
};
