import qrCode from 'qrcode-generator'
import {MessageEmbed} from "discord.js";
import {Embeds} from "discord-paginationembed";

export function parseDropboxLink(link){
  let string = link;
  string = string.split("/");
  string[5] = '?dl=1';
  string = string.join("/")
  return string
}

export function parseGDriveLink(link){
  return link.replace(/\/file\/d\/(.+)\/(.+)/, "/uc?export=download&id=$1");
}

export function createASCIIQrCode(link){
  let qr = qrCode(0, 'M');
  qr.addData(`${link}`);
  qr.make();
  return qr.createASCII()
}

export function createEmbeddedAnswer(args, receivedMessage, destination){
  const embeds = [];
  args.map(({qr_data, qr_link, name, platform, region , size}, index) => {
    embeds.push(new MessageEmbed()
      .addField('Page', index + 1, true)
      .addField('Name: ', name, true)
      .addField('QR: ', "```"+ qr_data +"```")
      .addField('QR link: ', qr_link, true)
      .addBlankField()
      .addField('Platform: ', platform, true)
      .addField('Region: ', region, true)
      .addField('Size: ', size, true)
    );
  })

  return  new Embeds()
    .setArray(embeds)
    .setAuthorizedUsers([receivedMessage.author.id])
    .setChannel(destination === "pm" ? receivedMessage.author : receivedMessage.channel)
    .setPageIndicator(true)
    .setPage(1)
    // Methods below are for customising all embeds
    .setTitle('Qr Code 3DS games search collection')
    .setDescription('==========================================================')
    .setFooter('')
    .setColor(0xFFFFFF)
    .setNavigationEmojis({
      back: '◀',
      jump: '↗',
      forward: '▶',
      delete: '🗑'
    })
    .setTimeout(600000)
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

export function checkIfDM(receivedMessage){
  return receivedMessage.channel.type === 'dm'
}

export const regexes = {
  DROPBOX: /\b(\w*dropbox\w*)\b/g,
  GDRIVE: /\b(\w*drive.google.com\w*)\b/g,
  URL: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g,
  ARGUMENTS: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?|\w+|"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'|\S+/g,
  REGIONS: /\b(\w*USA|JPN|EUR|GLOBAL|HACK\w*)\b/g
}
//(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\w+|"(?:\\"|[^"])+"|'(?:\\'|[^"])+'|\w+
