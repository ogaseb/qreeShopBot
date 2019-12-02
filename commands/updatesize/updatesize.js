const {
  getWholeDB,
  updateRegionArgument,
  updateSizeArgument
} = require("../../controllers/qre_items");
const axios = require("axios");
const pretty = require("prettysize");

module.exports.updateSizeOfFile = async function() {
  const rows = await getWholeDB();
  for (const { id, qrLink, name, region } of rows) {
    try {
      const response = await axios.head(qrLink, { timeout: 15000 });
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
        }

        if (found_region && region === "N/A") {
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
};
