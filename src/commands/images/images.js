const { createDataURLQrCode } = require("../../helpers/helpers");
const {
  getWholeDB,
  updateQrImageUrl
} = require("../../../controllers/qre_items");
const imageDataURI = require("image-data-uri");
const fs = require("fs");

module.exports.makeQrImagesfromDB = async function(
  messageArguments,
  receivedMessage
) {
  try {
    const rows = await getWholeDB();
    for (const {
      id,
      qr_image_url,
      qr_link,
      name,
      platform,
      region,
      uploader_discord_id
    } of rows) {
      const obj = {
        qr_image: createDataURLQrCode(qr_link),
        uploader_discord_id,
        id
      };

      if (qr_image_url === "null") {
        let string = name + platform + region + uploader_discord_id;
        string = string.replace(/[^a-z0-9]/gim, "");
        await imageDataURI.outputFile(obj.qr_image, "./img/" + string + ".jpg");
        fs.access("./img/" + string + ".jpg", fs.F_OK, async err => {
          if (err) {
            console.error(err);
            return;
          }
          const msg = await receivedMessage.channel.send("", {
            files: ["./img/" + string + ".jpg"]
          });
          // file exists
          obj.qr_image = msg.attachments.values().next().value.proxyURL;
          await updateQrImageUrl(obj.id, obj.qr_image);
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

// export async function makeQrImagesfromDB(messageArguments, receivedMessage) {
//
// }
