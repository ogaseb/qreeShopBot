require("dotenv").config();
import { Client } from "pg";
import escape from "pg-escape";

function createDBclient() {
  return new Client({
    connectionString: process.env.DATABASE_URL
  });
}

export async function createQree(
  qrData,
  qrLink,
  name,
  platform,
  region,
  size,
  uploader_discord_id
) {
  const client = createDBclient();
  try {
    await client.connect();

    await client.query(
      `INSERT INTO qre_items(qr_data, qr_link, name, platform, region, size, uploader_discord_id) VALUES('${qrData}', '${qrLink}', '${name}' , '${platform}', '${region}', '${size}', '${uploader_discord_id}')`
    );
    await client.end();
    console.log("DB -> save qr in DB");
  } catch (e) {
    console.log(e);
  }
}

export async function editUserJira(
  jiraLogin,
  jiraPassword,
  jiraSubdomain,
  userId
) {
  const client = createDBclient();
  await client.connect();
  try {
    await client.query(
      `UPDATE users SET jira_email = '${jiraLogin}', jira_api_key = '${jiraPassword}', jira_subdomain = '${[
        jiraSubdomain
      ]}'  WHERE user_id = '${userId}'`
    );
    console.log("DB -> save jira credentials in DB");
    await client.end();
  } catch (e) {
    console.log(e);
  }
}

export async function findGame(name) {
  const client = createDBclient();
  try {
    await client.connect();
    const res = await client.query(
      `SELECT * FROM qre_items WHERE name ILIKE '%${name}%';`
    );
    console.log("DB -> game found in DB");
    await client.end();
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function approxQrCount() {
  const client = createDBclient();
  try {
    await client.connect();
    const res = await client.query(`SELECT COUNT(*) FROM qre_items`);
    console.log("DB -> counting qr codes");
    await client.end();
    return res;
  } catch (e) {
    console.log(e);
  }
}
