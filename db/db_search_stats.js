require("dotenv").config();
import { Client } from "pg";
import escape from "pg-escape";

function createDBclient() {
  return new Client({
    connectionString: process.env.DATABASE_URL
  });
}

export async function insertOnSearchCommand(
  userId,
  userSearchPhrase,
  searchFrom
) {
  const client = createDBclient();
  try {
    await client.connect();

    await client.query(
      `INSERT INTO qre_search_stats(search_name, search_user_id, search_from) 
      VALUES('${userSearchPhrase}', '${userId}', '${searchFrom}')`
    );
    await client.end();
    console.log("DB -> save qr in DB");
  } catch (e) {
    console.log(e);
  }
}
