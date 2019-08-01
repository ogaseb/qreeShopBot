import { getStatsFromDB } from "../../db/db_search_stats";

export async function getStats(receivedMessage) {
  const response = await getStatsFromDB();
  console.log(response);
  let successCounter = 0,
    failureCounter = 0,
    searchCountFromDm = 0,
    searchCountFromServer = 0;
  rows.forEach(
    ({ search_name, search_user_id, search_from, search_success }) => {
      if (search_success) {
        successCounter++;
      } else {
        failureCounter++;
      }

      if (search_from === "dm") {
        searchCountFromDm++;
      } else if (search_from === "server") {
        searchCountFromServer++;
      }
    }
  );
  return await receivedMessage.channel.send(
    "```" +
      "STATS - searching: \n\n" +
      "searching in server count: " +
      searchCountFromServer +
      " \n" +
      "searching in dm's count: " +
      searchCountFromDm +
      " \n" +
      "successful search count: " +
      successCounter +
      " \n" +
      "failure search count: " +
      successCounter +
      " \n" +
      "```"
  );
}
