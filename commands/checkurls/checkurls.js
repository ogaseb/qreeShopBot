const { getWholeDB } = require("../../controllers/qree_items");
const axios = require("axios");

module.exports.checkUrlsForStatus = async function(client) {
  await client.channels
    .get("670579373623214102")
    .send(`Checking urls started... I will do it every 24 hours`);
  const rows = await getWholeDB();
  for (const { id, qrLink, name, uploaderDiscordId } of rows) {
    try {
      console.time(`scanningTime - ${name}`);
      await axios.head(qrLink, { timeout: 30000 });
      console.timeEnd(`scanningTime - ${name}`);
    } catch (e) {
      if (e.response) {
        if (/\b(?:4[0-9]{2}|5[0-4][0-9]|550)\b/.test(e.response.status)) {
          await client.channels
            .get("670579373623214102")
            .send(
              `${qrLink} sends ${e.response.status} respond code (not found or other error) for game: ${name}. DB ID for updating: ${id} . <@${uploaderDiscordId}>`
            );
        }
      } else {
        await client.channels
          .get("670579373623214102")
          .send(
            `${qrLink} sends error, but link probably works, check by clicking on it: ${name}. DB ID for updating: ${id} . <@${uploaderDiscordId}>`
          );
      }
    }
  }
  await client.channels
    .get("670579373623214102")
    .send(`All games have been scanned!`);
};
