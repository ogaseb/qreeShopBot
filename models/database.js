require("dotenv").config();
import { Client } from "pg";

export async function initializeDb() {
  try {
    const client = await new Client({
      connectionString: process.env.DATABASE_URL
    });
    await client.connect();
    await client.query(
      "CREATE TABLE IF NOT EXISTS qre_items(id SERIAL PRIMARY KEY, " +
        "qr_data text not null, " +
        "qr_image_url text not null, " +
        "qr_link varchar not null, " +
        "name varchar not null, " +
        "platform varchar not null, " +
        "region varchar not null," +
        "size varchar not null," +
        "uploader_discord_id varchar not null," +
        "uploader_name varchar not null" +
        ")"
    );

    // await client.query(
    //   "CREATE TABLE IF NOT EXISTS qre_stats(id SERIAL PRIMARY KEY, " +
    //   "search_from_channel_Count text not null, " +
    //   "search_from_dm_Count text not null " +
    //   ")"
    // );

    // await client.query(
    //   "CREATE TABLE IF NOT EXISTS qre_stats(id SERIAL PRIMARY KEY, " +
    //   "search_from_channel_Count text not null, " +
    //   "search_from_dm_Count text not null " +
    //   ")"
    // );

    client.end();
  } catch (e) {
    console.log(e);
  }
}
