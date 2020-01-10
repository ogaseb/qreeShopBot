const { getWholeDB } = require("../../controllers/qree_items");
const {
  third_party: { getGameCover }
} = require("../../helpers/index");

module.exports.findCoversForGames = async function(client) {
  await client.channels
    .get("605181514321494036")
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
    .get("605181514321494036")
    .send(`All games have been scanned!`);
};
