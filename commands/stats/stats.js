import { getStatsFromDB } from "../../db/db_search_stats";
import * as _ from "lodash"

export async function getStats(receivedMessage) {
  const { rows } = await getStatsFromDB();
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


  const resultSearchCount = _.countBy(rows, 'search_name')
  let sortableResultSearchCount = [];
  for (let search in resultSearchCount) {
    sortableResultSearchCount.push([resultSearchCount, resultSearchCount[search]]);
  }
  sortableResultSearchCount.sort(function(a, b) {
    return a[1] - b[1];
  });

  console.log(sortableResultSearchCount)
  // console.log(JSON.stringify(result, null, 2));
  console.log(
    sortableResultSearchCount[sortableResultSearchCount.length - 1],
    sortableResultSearchCount[sortableResultSearchCount.length - 2],
    sortableResultSearchCount[sortableResultSearchCount.length - 3],
    sortableResultSearchCount[sortableResultSearchCount.length - 4],
    sortableResultSearchCount[sortableResultSearchCount.length - 5]
  )


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
    "1. '" + sortableResultSearchCount[sortableResultSearchCount.length - 1][0] + "' times: " + sortableResultSearchCount[sortableResultSearchCount.length - 1][1] + "\n" +
    "2. '" + sortableResultSearchCount[sortableResultSearchCount.length - 2][0] + "' times: " + sortableResultSearchCount[sortableResultSearchCount.length - 2][1] + "\n" +
    "3. '" + sortableResultSearchCount[sortableResultSearchCount.length - 3][0] + "' times: " + sortableResultSearchCount[sortableResultSearchCount.length - 3][1] + "\n" +
    "4. '" + sortableResultSearchCount[sortableResultSearchCount.length - 4][0] + "' times: " + sortableResultSearchCount[sortableResultSearchCount.length - 4][1] + "\n" +
    "5. '" + sortableResultSearchCount[sortableResultSearchCount.length - 5][0] + "' times: " + sortableResultSearchCount[sortableResultSearchCount.length - 5][1] + "\n" +
    ""+
      "```"
  );
}
