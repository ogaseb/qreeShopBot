import { getRandomMeme } from "../../helpers/helpers";
import { RichEmbed } from "discord.js";

export async function headPat(messageArgument, receivedMessage) {
  if (messageArgument.length !== 2) {
    return receivedMessage.channel.send(
      `hey, specify who you want to headpat!`
    );
  }
  const meme = await getRandomMeme("head-pat-anime");
  console.log(receivedMessage);
  const embedHeadpat = new RichEmbed()
    .setColor("#0099ff")
    .setDescription(
      `uwu *<@${receivedMessage.author.id}> headpats <@${messageArgument[1]}>*`
    )
    .setImage(meme);
  receivedMessage.channel.send(embedHeadpat);
}
