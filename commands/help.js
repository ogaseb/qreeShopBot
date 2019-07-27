import { MessageEmbed } from "discord.js";
import { Embeds } from "discord-paginationembed";
import { checkIfDM } from "../helpers/helpers";

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
          "Arguments: ",
          "```" +
            "<platform> - GBA, NES, SNES, 3DS, DSI, ESHOP, NEW 3DS, NEO GEO \n\n" +
            "<regions> - USA, JPN, EUR, GLOBAL, HACK \n\n" +
            "<size> - *KB, *MB, *GB \n" +
            "```"
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
        .addField("**COMMAND**: ", "```edit```")
        .addField(
          "Description",
          "```edit - edit same as upload is available only in certain servers on " +
            "Discord and only available to users containing special role(s). " +
            "First you need to find the game you want to edit, just search it with search command and copy `DB ID` number" +
            "then you proceed by typing edit command with this id ad you copied. After the game is found follow the instructions" +
            "```"
        )
        .addField(
          "Arguments: ",
          "```" +
            "<platform> - GBA, NES, SNES, 3DS, DSI, ESHOP, NEW 3DS, NEO GEO \n\n" +
            "<regions> - USA, JPN, EUR, GLOBAL, HACK \n\n" +
            "<size> - *KB, *MB, *GB \n" +
            "```"
        )
        .addField(
          "Command: ",
          "```" +
            serverInvokers.get(receivedMessage.guild.id) +
            " edit <id> ```"
        )

        .addField(
          "Example: ",
          "```" + serverInvokers.get(receivedMessage.guild.id) + " edit 10 ```"
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
}
