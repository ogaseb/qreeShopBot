require("dotenv").config();
import { Client } from "pg";

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
  uploader_name,
  receivedMessage
) {
  const client = createDBclient();
  try {
    await client.connect();
    await client.query(
      `INSERT INTO qre_items(qr_data, qr_link, name, platform, region, size, uploader_discord_id, uploader_name , qr_image_url) 
      VALUES('${qrData}', '${qrLink}', '${name}' , '${platform}', '${region}', '${size}', '${uploader_discord_id}' , '${uploader_name}', '${qrImageUrl}');`
    );
    await client.end();
    console.log("DB -> save qr in DB");
  } catch (e) {
    await receivedMessage.channel.send(
      "something went wrong, send it to developer: \n" +
        "```diff\n- " +
        e +
        "```"
    );
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
      qr_image_url = '${qrImageUrl}' ,
      qr_link = '${qrLink}', 
      name = '${name}', 
      platform = '${platform}', 
      region = '${region}' ,   
      size = '${size}' ,  
      uploader_discord_id = '${uploader_discord_id}' ,   
      uploader_name = '${uploader_name}' WHERE id = ${id};`
    );
    console.log("DB -> edited in DB");
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

export async function updateSizeArgument(id, size) {
  const client = createDBclient();
  try {
    await client.connect();
    const res = await client.query(
      `UPDATE qre_items SET size = '${size}' WHERE id = ${id}`
    );
    console.log("DB -> updating size for id: " + id);
    await client.end();
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function updateRegionArgument(id, region) {
  const client = createDBclient();
  try {
    await client.connect();
    const res = await client.query(
      `UPDATE qre_items SET region = '${region}' WHERE id = ${id}`
    );
    console.log("DB -> updating region for id: " + id);
    await client.end();
    return res;
  } catch (e) {
    console.log(e);
  }
}
