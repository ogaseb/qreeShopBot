const {
  other: { checkFileSize, filteredRegexes },
  qr: { parseURL, createQrImageUrlFromLink }
} = require("../../../helpers");

const createInitialObjectUpload = async (messageArguments, receivedMessage) => {
  let finalObject = {
    name: null,
    qrLink: null,
    qrImageUrl: null,
    platform: null,
    region: null,
    size: null,
    uploaderDiscordId: null,
    uploaderName: null
  };

  const regexesObj = filteredRegexes(["URL", "TITLE", "REGIONS", "PLATFORMS"]);

  let foundArgsObj = {};
  for (const regex in regexesObj) {
    const itemIndex = await messageArguments.findIndex(value =>
      value.match(regexesObj[regex])
    );
    if (itemIndex === -1) {
      return receivedMessage.channel.send(
        `invalid arguments \`${regex}\` for upload command`
      );
    } else {
      foundArgsObj[regex] = messageArguments[itemIndex];
      messageArguments.splice(itemIndex, 1);
    }
  }

  finalObject.name = foundArgsObj.TITLE.replace(/['"]+/g, "");
  finalObject.qrLink = await parseURL(foundArgsObj.URL);
  finalObject.platform = foundArgsObj.PLATFORMS;
  finalObject.region = foundArgsObj.REGIONS;
  finalObject.size = await checkFileSize(finalObject.qrLink);
  finalObject.uploaderDiscordId = receivedMessage.author.id;
  finalObject.uploaderName = receivedMessage.author.username;
  finalObject.qrImageUrl = await createQrImageUrlFromLink(
    finalObject,
    receivedMessage,
    foundArgsObj.qrLink
  );
  const isEmpty = Object.values(finalObject).every(x => x === null);
  if (isEmpty) {
    throw `something went wrong with creating data for qr code`;
  } else {
    return finalObject;
  }
};

module.exports.createInitialObjectUpload = createInitialObjectUpload;
