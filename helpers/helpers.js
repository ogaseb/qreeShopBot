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

export function createEmbeddedHelper(
  serverInvokers,
  receivedMessage,
  destination
) {
  const embeds = [];

  if (checkIfDM(receivedMessage)) {
    embeds.push(
      new MessageEmbed()
        .addField("**COMMAND**: ", "```search```")
        .addField(
          "Description",
          "```search -  It's available on channels and DM's, it will search for all games containing typed phrase. (emoji navigation in dm's is a little buggy but it works)```"
        )
        .addField("Command: ", '```!qre search "<name>" ```')
        .addField("Example: ", '```!qre search "Super Castlevania IV"```')
    );
  } else {
    embeds.push(
      new MessageEmbed()
        .addField("**COMMAND**: ", "```upload```")
        .addField(
          "Description",
          "```upload - upload is available only in certain servers on " +
            "Discord and only available to users containing special role(s). " +
            "Remember about quotation marks in title of the game!```"
        )
        .addField(
          "Command: ",
          "```" +
            serverInvokers.get(receivedMessage.guild.id) +
            ' upload <url> "<name>" <platform> <region> <size> ```'
        )
        .addField(
          "Example: ",
          "```" +
            serverInvokers.get(receivedMessage.guild.id) +
            ' upload https://files.catbox.moe/au9pkx.cia "Super Castlevania IV" GBA USA 5MB ```'
        )
    );

    embeds.push(
      new MessageEmbed()
        .addField("**COMMAND**: ", "```search```")
        .addField(
          "Description",
          "```search -  It's available on channels and DM's, it will search for all games containing typed phrase. (emoji navigation in dm's is a little buggy but it works)```"
        )
        .addField(
          "Command: ",
          "```" +
            serverInvokers.get(receivedMessage.guild.id) +
            ' search "<name>" ```'
        )
        .addField(
          "Example: ",
          "```" +
            serverInvokers.get(receivedMessage.guild.id) +
            ' search "Super Castlevania IV"```'
        )
    );

    embeds.push(
      new MessageEmbed()
        .addField("**COMMAND**: ", "```invoke```")
        .addField(
          "Description",
          "```invoke - server only command which lets you change the command for invoking bot the default is always !qre```"
        )
        .addField(
          "Command: ",
          "```" +
            serverInvokers.get(receivedMessage.guild.id) +
            " invoke <new_command> ```"
        )
        .addField(
          "Example: ",
          "```" +
            serverInvokers.get(receivedMessage.guild.id) +
            "invoke %qre```"
        )
    );
  }

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
      .setTitle("Qr Code 3DS help")
      .setDescription(
        "=========================================================="
      )
      .addField(
        "NOTE:",
        "```links - you can provide direct link or normal sharing links from google and dropbox it will be automatically converted into direct ones```"
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
  args.map(({ qr_data, qr_link, name, platform, region, size }, index) => {
    embeds.push(
      new MessageEmbed()
        .addField("Name: ", name, true)
        .addField("Page", index + 1, true)
        .addField("QR: ", "```" + qr_data + "```")
        .addField("QR link: ", qr_link, true)
        .addBlankField()
        .addField("Platform: ", platform, true)
        .addField("Region: ", region, true)
        .addField("Size: ", size, true)
    );
  });

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

export function checkIfDM(receivedMessage) {
  return receivedMessage.channel.type === "dm";
}

export const regexes = {
  DROPBOX: /\b(\w*dropbox\w*)\b/g,
  GDRIVE: /\b(\w*drive.google.com\w*)\b/g,
  URL: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g,
  ARGUMENTS: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?|\w+|"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'|\S+/g,
  REGIONS: /\b(\w*USA|JPN|EUR|GLOBAL|HACK\w*)\b/gi,
  PLATFORMS: /\b(\w*GBA|NES|SNES|3DS|NEW3DS|DSI|ESHOP|NEW 3DS\w*)\b/gi,
  SIZE: /\b(\w*MB|GB|KB\w*)\b/gi,
  SCRAPER_TITLE: /([^\(]+)|\((.*?)\)|/g
};
//(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\w+|"(?:\\"|[^"])+"|'(?:\\'|[^"])+'|\w+
