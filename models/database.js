require("dotenv").config()
import {Client} from "pg"



export async function initializeDb() {
	try {
		const client = await new Client({
			connectionString: process.env.DATABASE_URL
		})
		await client.connect()
		await client.query(
			"CREATE TABLE IF NOT EXISTS qre_items(id SERIAL PRIMARY KEY, " +
			"qr_data text not null, " +
			"qr_link varchar not null, " +
			"name varchar not null, " +
			"console varchar not null, " +
			"region varchar not null," +
			"size varchar not null," +
			"uploader_discord_id varchar not null" +
			")"
		)

		client.end()
	} catch (e) {
		console.log(e)
	}
}
