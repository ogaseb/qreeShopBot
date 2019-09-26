import { getStatsFromDB } from "../../db/db_search_stats";
import * as _ from "lodash"

export async function getStats(receivedMessage) {
  const { rows } = await getStatsFromDB();
  let successCounter = 0,
    failureCounter = 0,
    searchCountFromDm = 0,
    searchCountFromServer = 0;
  rows.forEach(
    ({ search_from, search_success }) => {
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

  const result = _.countBy(rows, 'search_name')
  let sortable = [];
  for (let search in result) {
    sortable.push([search, result[search]]);
  }
  sortable.sort(function(a, b) {
    return a[1] - b[1];
  });

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
      failureCounter +
      " \n\n" +
    "top searching phrases: \n" +
    "1. '" + sortable[sortable.length - 1][0] + "' times: " + sortable[sortable.length - 1][1] + "\n" +
    "2. '" + sortable[sortable.length - 2][0] + "' times: " + sortable[sortable.length - 2][1] + "\n" +
    "3. '" + sortable[sortable.length - 3][0] + "' times: " + sortable[sortable.length - 3][1] + "\n" +
    "4. '" + sortable[sortable.length - 4][0] + "' times: " + sortable[sortable.length - 4][1] + "\n" +
    "5. '" + sortable[sortable.length - 5][0] + "' times: " + sortable[sortable.length - 5][1] + "\n" +
    ""+
      "```"
  );
}
