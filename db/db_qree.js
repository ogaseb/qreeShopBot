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
  qrImageUrl,
  qrLink,
  name,
  platform,
  region,
  size,
  uploader_discord_id,
  uploader_name
) {
  const client = createDBclient();
  try {
    await client.connect();

    await client.query(
      `INSERT INTO qre_items(qr_data, qr_link, qr_image_url, name, platform, region, size, uploader_discord_id, uploader_name) 
      VALUES('${qrData}', '${qrLink}', '${qrImageUrl}' , '${name}' , '${platform}', '${region}', '${size}', '${uploader_discord_id}' , '${uploader_name}')`
    );
    await client.end();
    console.log("DB -> save qr in DB");
  } catch (e) {
    console.log(e);
  }
}

export async function editQree(
  id,
  qrData,
  qrImageUrl,
  qrLink,
  name,
  platform,
  region,
  size,
  uploader_discord_id,
  uploader_name
) {
  const client = createDBclient();
  await client.connect();
  try {
    await client.query(
      `UPDATE qre_items SET qr_data = '${qrData}',
      qr_image_url = '${qrImageUrl}' 
      qr_link = '${qrLink}', 
      name = '${name}', 
      platform = '${platform}', 
      region = '${region}' ,   
      size = '${size}' ,  
      uploader_discord_id = '${uploader_discord_id}' ,   
      uploader_name = '${uploader_name}' WHERE id = ${id}`
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
    // console.log("DB -> game found in DB");
    await client.end();
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function findGameToEdit(id) {
  const client = createDBclient();
  try {
    await client.connect();
    const res = await client.query(
      "SELECT * FROM qre_items WHERE id= " + id + " LIMIT 1;"
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

export async function getWholeDB() {
  const client = createDBclient();
  try {
    await client.connect();
    const res = await client.query(`SELECT * FROM qre_items`);
    console.log("DB -> getting whole DB");
    await client.end();
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function updateQrImageUrl(id, qrImageUrl) {
  const client = createDBclient();
  try {
    await client.connect();
    const res = await client.query(
      `UPDATE qre_items SET qr_image_url = '${qrImageUrl}' WHERE id = ${id}`
    );
    console.log("DB -> updating qr url image");
    await client.end();
    return res;
  } catch (e) {
    console.log(e);
  }
}
