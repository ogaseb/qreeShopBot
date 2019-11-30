`use strict`;
require("dotenv").config();
const { RichEmbed } = require("discord.js");
const Pagination = require("discord-paginationembed");
const { getGameCover } = require("../../helpers/third_party/third_party");
const { getWholeDB } = require("../../controllers/qre_items");

async function createArrayOfEmbeddedMessages(data) {
  const embeds = [];
  if (!Array.isArray(data)) {
    data = [data];
  }
  for (const {
    id,
    name,
    platform,
    region,
    size,
    uploaderName,
    qrImageUrl,
    thumbnail
  } of data) {
    const gameThumbnail =
      thumbnail ||
      (await getGameCover(name, id)) ||
      "https://cdn4.iconfinder.com/data/icons/nintendo-console-line-set/32/ico-line-3ds-512.png";
    embeds.push(
      new RichEmbed()
        .setImage(qrImageUrl)
        .addField("Name: ", name)
        .addField("DB ID: ", id, true)
        .addField("Platform: ", platform, true)
        .addField("Region: ", region, true)
        .addField("Size: ", size, true)
        .addField("QR:", "===================")
        .addField("Author: ", uploaderName, true)
        .setThumbnail(gameThumbnail)
    );
  }
  return embeds;
}

async function createPaginationFromEmbed(
  embeds,
  author,
  pageIndicator = true,
  channel,
  title,
  footer,
  showNavigation = true,
  timeout,
  isFromRandom
) {
  return new Pagination.Embeds()
    .setArray(embeds)
    .setAuthorizedUsers(author)
    .setChannel(channel)
    .setPageIndicator(pageIndicator)
    .setPage(1)
    .setTitle(title)
    .setFooter(footer)
    .setColor(0x000000)
    .setFunctionEmojis(
      isFromRandom
        ? {
            "🔄": async (user, instance) => {
              const games = await getWholeDB();
              const chooseRandom =
                games[Math.floor(Math.random() * games.length)];
              const valuesArray = [
                chooseRandom.dataValues.name,
                chooseRandom.dataValues.id,
                chooseRandom.dataValues.platform,
                chooseRandom.dataValues.region,
                chooseRandom.dataValues.size,
                "===================",
                chooseRandom.dataValues.uploaderName
              ];
              for (const embed of instance.array) {
                embed.thumbnail.url = chooseRandom.dataValues.thumbnail;
                embed.image.url = chooseRandom.dataValues.qrImageUrl;
                valuesArray.forEach((value, index) => {
                  embed.fields[index].value = value;
                });
              }
            }
          }
        : {}
    )
    .setDisabledNavigationEmojis(showNavigation ? [] : ["ALL"])
    .setNavigationEmojis({
      back: "◀",
      jump: "↗",
      forward: "▶",
      delete: "🗑"
    })
    .setTimeout(timeout)
    .on("error", console.error);
}

async function createEmbeddedAnswer(
  data,
  receivedMessage,
  loadingMessageId,
  destination = ""
) {
  const embeds = await createArrayOfEmbeddedMessages(data);
  loadingMessageId
    ? await receivedMessage.channel.messages.get(loadingMessageId).delete()
    : null;

  const author = [receivedMessage.author.id] || [""];
  const channel =
    destination === "pm" ? receivedMessage.author : receivedMessage.channel;

  return await createPaginationFromEmbed(
    embeds,
    author,
    true,
    channel,
    "Qr Code 3DS games search collection",
    "Bot created by: ProPanek#0188",
    true,
    600000,
    false
  );
}

async function sendToQrGames(data, receivedMessage, client) {
  const embeds = await createArrayOfEmbeddedMessages(data);
  const channel = client.channels.get(process.env.BOT_SUBSCRIPTION_CHANNEL);
  return await createPaginationFromEmbed(
    embeds,
    [""],
    false,
    channel,
    "QR Code 3DS games",
    "Bot created by: ProPanek#0188",
    false,
    1000,
    false
  );
}

async function createRandomEmbed(
  data,
  receivedMessage,
  destination = "",
  loadingMessageId
) {
  // console.log(data,receivedMessage,loadingMessageId)
  const embeds = await createArrayOfEmbeddedMessages(data);
  const author = [receivedMessage.author.id] || [""];
  const channel =
    destination === "pm" ? receivedMessage.author : receivedMessage.channel;
  loadingMessageId
    ? await receivedMessage.channel.messages.get(loadingMessageId).delete()
    : null;
  return await createPaginationFromEmbed(
    embeds,
    author,
    false,
    channel,
    "Random qr game",
    "Bot created by: ProPanek#0188",
    false,
    120000,
    true
  );
}

module.exports = {
  createEmbeddedAnswer,
  sendToQrGames,
  createArrayOfEmbeddedMessages,
  createPaginationFromEmbed,
  createRandomEmbed
};
