require("dotenv").config();
import { Client } from "pg";

function createDBclient() {
  return new Client({
    connectionString: process.env.DATABASE_URL
  });
}

export async function insertOnSearchCommand(
  userId,
  userSearchPhrase,
  searchFrom,
  searchSuccess
) {
  const client = createDBclient();
  try {
    await client.connect();

    await client.query(
      `INSERT INTO qre_search_stats(search_name, search_user_id, search_from, search_success) 
      VALUES('${userSearchPhrase}', '${userId}', '${searchFrom}', '${searchSuccess}')`
    );
    await client.end();
    console.log("DB -> save search stat in DB");
  } catch (e) {
    console.log(e);
  }
}

export async function getStatsFromDB() {
  const client = createDBclient();
  try {
    await client.connect();

    await client.query(`SELECT * FROM qre_search_stats`);
    await client.end();
    console.log("DB -> get all stats from DB");
  } catch (e) {
    console.log(e);
  }
}
