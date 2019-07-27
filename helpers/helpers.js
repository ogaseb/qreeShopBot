import qrCode from "qrcode-generator";
import { MessageEmbed } from "discord.js";
import { Embeds } from "discord-paginationembed";

export function parseDropboxLink(link) {
  let string = link;
  string = string.split("/");
  string[5] = "?dl=1";
  string = string.join("/");
  return string;
}

export function parseGDriveLink(link) {
  return link.replace(/\/file\/d\/(.+)\/(.+)/, "/uc?export=download&id=$1");
}

export function createASCIIQrCode(link) {
  let qr = qrCode(0, "M");
  qr.addData(`${link}`);
  qr.make();
  return qr.createASCII();
}

export async function limitlessFetchMessages(channel, limit = 9000) {
  const sum_messages = [];
  let last_id;

  while (true) {
    const options = { limit: 100 };
    if (last_id) {
      options.before = last_id;
    }

    const messages = await channel.messages.fetch(options);
    sum_messages.push(...messages.array());
    last_id = messages.last().id;

    if (messages.size !== 100 || sum_messages >= limit) {
      break;
    }
  }

  return sum_messages;
}

export function createEmbeddedAnswer(args, receivedMessage, destination) {
  const embeds = [];
  args.map(
    (
      { id, qr_data, qr_link, name, platform, region, size, uploader_name },
      index
    ) => {
      embeds.push(
        new MessageEmbed()
          .addField("Name: ", name, true)
          .addField("Page", index + 1, true)
          .addField("QR: ", "```" + qr_data + "```")
          .addField("QR link: ", qr_link, true)
          .addField("DB ID: ", id, true)
          .addBlankField()
          .addField("Platform: ", platform, true)
          .addField("Region: ", region, true)
          .addField("Size: ", size, true)
          .addField("Author: ", uploader_name, true)
      );
    }
  );

  return (
    new Embeds()
      .setArray(embeds)
      .setAuthorizedUsers([receivedMessage.author.id])
      .setChannel(
        destination === "pm" ? receivedMessage.author : receivedMessage.channel
      )
      .setPageIndicator(true)
      .setPage(1)
      // Methods below are for customising all embeds
      .setTitle("Qr Code 3DS games search collection")
      .setDescription(
        "=========================================================="
      )
      .setFooter("")
      .setColor(0xffffff)
      .setNavigationEmojis({
        back: "◀",
        jump: "↗",
        forward: "▶",
        delete: "🗑"
      })
      .setTimeout(600000)
  );
  // .on('start', () => console.log('Started!'))
  // // Upon a user deleting the embed
  // .on('finish', (user) => console.log(`Finished! User: ${user.username}`))
  // // Upon a user reacting to the embed
  // .on('react', (user, emoji) => console.log(`Reacted! User: ${user.username} | Emoji: ${emoji.name} (${emoji.id})`))
  // // Upon the awaiting time expired
  // .on('expire', () => console.warn('Expired!'))
  // // Upon non-PaginationEmbed error (e.g: Discord API Error)
  // .on('error', console.error)
}

export function sendToQrGames(args, receivedMessage, client) {
  const embeds = [];

  console.log(client.channels.get("582266411166990346"));
  embeds.push(
    new MessageEmbed()
      .addField("Name: ", args.name, true)
      .addField("QR: ", "```" + args.qr_data + "```")
      .addField("QR link: ", args.qr_link, true)
      .addBlankField()
      .addField("Platform: ", args.platform, true)
      .addField("Region: ", args.region, true)
      .addField("Size: ", args.size, true)
      .addField("Author: ", args.uploader_name, true)
  );

  return (
    new Embeds()
      .setArray(embeds)
      .setAuthorizedUsers([receivedMessage.author.id])
      .setChannel(client.channels.get("582266411166990346"))
      .setPage(1)
      // Methods below are for customising all embeds
      .setTitle("Qr Code 3DS games search collection")
      .setDescription(
        "=========================================================="
      )
      .setFooter("")
      .setColor(0xffffff)
      .setDisabledNavigationEmojis(["ALL"])
      .setTimeout(600000)
  );
  // .on('start', () => console.log('Started!'))
  // // Upon a user deleting the embed
  // .on('finish', (user) => console.log(`Finished! User: ${user.username}`))
  // // Upon a user reacting to the embed
  // .on('react', (user, emoji) => console.log(`Reacted! User: ${user.username} | Emoji: ${emoji.name} (${emoji.id})`))
  // // Upon the awaiting time expired
  // .on('expire', () => console.warn('Expired!'))
  // // Upon non-PaginationEmbed error (e.g: Discord API Error)
  // .on('error', console.error)
}

export function checkIfDM(receivedMessage) {
  return receivedMessage.channel.type === "dm";
}

export const regexes = {
  DROPBOX: /\b(\w*dropbox\w*)\b/g,
  CIA: /\b(\w*cia\w*)\b/g,
  GDRIVE: /\b(\w*drive.google.com\w*)\b/g,
  URL: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g,
  ARGUMENTS: /\b(\w*GBA|NES|SNES|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO\w*)\b|(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?|\w+|"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'|\S+/g,
  TITLE: /"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'/g,
  REGIONS: /\b\w*USA|JPN|EUR|GLOBAL|HACK\w*\b/gi,
  PLATFORMS: /\b\w*GBA|NES|SNES|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO\w*\b/gi,
  SIZE: /\b\w* ?MB|\w* ?GB|\w* ?KB\w*\b/gi,
  SCRAPER_TITLE: /([^\(]+)|\((.*?)\)|/g
};
//(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\w+|"(?:\\"|[^"])+"|'(?:\\'|[^"])+'|\w+
