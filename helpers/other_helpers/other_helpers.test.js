require("dotenv").config();
const { Client } = require("discord.js");
const {
  parseURL,
  createASCIIQrCode,
  createDataURLQrCode
} = require("./other_helpers");

let client;
beforeEach(async () => {
  client = new Client();
  await client.login(process.env.BOT_TOKEN);
});

afterEach(async () => {
  client.destroy();
});

describe("Helpers", () => {
  test("it should return parsed link from dropbox or google drive", () => {
    const mockLink =
      "https://www.dropbox.com/s/3i7r7u04qzi9km5/Legend%20of%20Zelda%2C%20The%20-%20Four%20Swords%20Anniversary%20Edition%20%28Europe%2C%20Australia%29.cia?dl=0";
    const parsedDropboxUrl = parseURL(mockLink);
    expect(typeof parsedDropboxUrl).toBe("string");
    expect(parsedDropboxUrl).toBe(
      "https://www.dropbox.com/s/3i7r7u04qzi9km5/?dl=1"
    );

    const mockLinkSh =
      "https://www.dropbox.com/sh/7yejob260oorc2e/AAD2EnZjFly0is0x46kzW-1-a/Flipnote%20Studio%203D%20%28USA%29.cia?dl=1";
    const parsedDropboxUrlSh = parseURL(mockLinkSh);
    expect(typeof parsedDropboxUrlSh).toBe("string");
    expect(parsedDropboxUrlSh).toBe(
      "https://www.dropbox.com/sh/7yejob260oorc2e/AAD2EnZjFly0is0x46kzW-1-a/Flipnote%20Studio%203D%20%28USA%29.cia?dl=1"
    );
  });
});
