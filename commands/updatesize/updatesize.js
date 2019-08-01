import {getWholeDB, updateRegionArgument, updateSizeArgument} from "../../db/db_qree";
import axios from "axios";
import pretty from "prettysize";

export async function updateSize() {
  const { rows } = await getWholeDB();
  for (const { id, qr_link, name, region } of rows) {
    try {
      console.log(`starting scanning ${name}`);
      const response = await axios.head(qr_link, { timeout: 15000 });
      if (response && response.status !== 404) {
        let found_region;
        if (response.headers["content-disposition"]) {
          found_region = response.headers["content-disposition"].match(
            /\b\w*USA|JPN|EUR|GLOBAL|HACK|RF\w*\b/i
          );
        }

        if (response.headers["content-length"]) {
          await updateSizeArgument(
            id,
            pretty(response.headers["content-length"], true)
          );
          console.log(
            pretty(response.headers["content-length"], true),
            name,
            id
          );
        }

        if (found_region && region === "N/A") {
          console.log(found_region[0]);
          await updateRegionArgument(id, found_region[0]);
        }
      }
    } catch (e) {
      if (e.response) {
        console.log(e.response.status);
      } else {
        console.log(e);
      }
    }
  }
}