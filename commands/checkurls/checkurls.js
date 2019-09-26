import { getWholeDB } from "../../db/db_qree";
import axios from "axios";

export async function urlStatus(client) {
  await client.channels
    .get("604692367018033152")
    .send(`Checking urls started... I will do it every 24 hours`);
  const rows = await getWholeDB();
  for (const { id, qr_link, name, uploader_discord_id } of rows) {
    try {
      console.time(`scanningTime - ${name}`)
      await axios.head(qr_link, { timeout: 30000 });
      console.timeEnd(`scanningTime - ${name}`);
    } catch (e) {
      if (e.response) {
        if (e.response.status === 404) {
          await client.channels
            .get("604692367018033152")
            .send(
              `${qr_link} sends ${e.response.status} respond code (not found or other error) for game: ${name}. DB ID for updating: ${id} . <@${uploader_discord_id}>`
            );
        }
      } else {
        await client.channels
          .get("604692367018033152")
          .send(
            `${qr_link} sends error, but link probably works, check by clicking on it: ${name}. DB ID for updating: ${id} . <@${uploader_discord_id}>`
          );
      }
    }
  }
  await client.channels
    .get("604692367018033152")
    .send(`All games have been scanned!`);
}
