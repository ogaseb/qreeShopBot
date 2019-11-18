const { getWholeDB } = require("../../../controllers/qre_items");
const axios = require("axios");

module.exports.urlStatus = async function(client) {
  await client.channels
    .get("604692367018033152")
    .send(`Checking urls started... I will do it every 24 hours`);
  const rows = await getWholeDB();
  for (const { id, qrLink, name, uploaderDiscordId } of rows) {
    try {
      console.time(`scanningTime - ${name}`);
      await axios.head(qrLink, { timeout: 30000 });
      console.timeEnd(`scanningTime - ${name}`);
    } catch (e) {
      if (e.response) {
        if (e.response.status === 404) {
          await client.channels
            .get("604692367018033152")
            .send(
              `${qrLink} sends ${e.response.status} respond code (not found or other error) for game: ${name}. DB ID for updating: ${id} . <@${uploaderDiscordId}>`
            );
        }
      } else {
        await client.channels
          .get("604692367018033152")
          .send(
            `${qrLink} sends error, but link probably works, check by clicking on it: ${name}. DB ID for updating: ${id} . <@${uploaderDiscordId}>`
          );
      }
    }
  }
  await client.channels
    .get("604692367018033152")
    .send(`All games have been scanned!`);
};

// export async function urlStatus(client) {
//
// }
