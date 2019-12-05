const {
  qr: { createDataURLQrCode }
} = require("../../helpers/index");
const {
  getWholeDB,
  updateQrImageUrl
} = require("../../controllers/qree_items");
const imageDataURI = require("image-data-uri");
const fs = require("fs");

module.exports.makeQrImagesFromDB = async function(
  messageArguments,
  receivedMessage
) {
  try {
    const rows = await getWholeDB();
    for (const {
      id,
      qrImageUrl,
      qrLink,
      name,
      platform,
      region,
      uploaderDiscordId
    } of rows) {
      const obj = {
        qr_image: createDataURLQrCode(qrLink),
        uploaderDiscordId,
        id
      };

      if (qrImageUrl === "null") {
        let string = name + platform + region + uploaderDiscordId;
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
