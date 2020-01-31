import { getWholeDB } from "../../db/db_qree";
import axios from "axios";
import { getGameCover } from "../../helpers/helpers";

export async function findCovers(client) {
  await client.channels
    .get("604231930703118348")
    .send(`searching for covers...`);
  const rows = await getWholeDB();
  for (const { id, name } of rows) {
    try {
      console.time(`searchingTime - ${name}`);
      await getGameCover(name, id);
      console.timeEnd(`searchingTime - ${name}`);
    } catch (e) {
      console.log(e);
    }
  }
  await client.channels
    .get("604231930703118348")
    .send(`All games have been scanned!`);
}
