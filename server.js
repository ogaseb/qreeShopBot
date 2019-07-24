require('dotenv').config()
import {Client, MessageEmbed} from 'discord.js'
import { Embeds, FieldsEmbed, IClientAssets } from 'discord-paginationembed';
import {parseGDriveLink, parseDropboxLink, createASCIIQrCode, regexes} from "./helpers/helpers";
import {initializeDb} from './models/database'
import {createQree, findGame, approxQrCount} from './db/db_qree'


void (async function () {
  try {
    await initializeDb()
    console.log("DB -> init DB")
  }
  catch (e) {
    console.log(e)
  }

  try {
    await client.login(process.env.BOT_TOKEN)
  } catch (e) {
    console.log(e)
  }

})()

const client = new Client()
let botInvoker = process.env.BOT_DEFAULT_INVOKE
let serverInvokers = new Map()

client.on('ready', async () => {



  console.log('On Discord!');

  console.log("Connected as " + client.user.tag)
  console.log("Servers:")
  client.guilds.forEach((guild) => {
    serverInvokers.set(guild.id, botInvoker)
    console.log(" - " + guild.id)
    guild.channels.forEach((channel) => {
      console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
    })

    console.log(serverInvokers)
  })

  setInterval(async ()=>{
    const qrCount = await approxQrCount()
    qrCount.rows.map( async ({count}) => {
      await client.user.setActivity(`QR Codes count: ${count}`, { type: 'PLAYING' });
    })
  },60000)
})

client.on('message', (receivedMessage) => {
  if (receivedMessage.author === client.user) { // Prevent bot from responding to its own messages
    return
  }
  console.log(receivedMessage.channel.type)

  if (receivedMessage.channel.type === 'dm'){
    if (receivedMessage.content.startsWith('!qre')) {
      processCommand(receivedMessage)
    }
  } else {
    if (receivedMessage.content.startsWith(`${serverInvokers.get(receivedMessage.guild.id)}`)) {
      processCommand(receivedMessage)
    }
  }

  // if (receivedMessage.content.startsWith(`${serverInvokers.get(receivedMessage.guild.id || null) || '!qre'}`)) {
  //   processCommand(receivedMessage)
  // }
})

function processCommand(receivedMessage) {
  let fullCommand, primaryCommand
  if (receivedMessage.channel.type === 'dm'){
     fullCommand = receivedMessage.content.substr(5)
  } else {
     fullCommand = receivedMessage.content.substr(serverInvokers.get(receivedMessage.guild.id).length + 1)
  }

  let messageArguments = fullCommand.match(regexes.ARGUMENTS)
  if (messageArguments !== null && messageArguments.length) {
    primaryCommand = messageArguments[0] // The first word directly after the exclamation is the command
  }

  if(primaryCommand === "" || primaryCommand === null || primaryCommand === undefined){
    if (receivedMessage.channel.type === 'dm'){
      return receivedMessage.channel.send(
          `You need to specify which command you want to use type "!qre help" to display available commands`
      )
    } else {
      return receivedMessage.channel.send(
          `You need to specify which command you want to use type "${serverInvokers.get(receivedMessage.guild.id)} help" to display available commands`
      )
    }

  }

  if(primaryCommand === "help"){
    if (receivedMessage.channel.type === 'dm'){
      return receivedMessage.channel.send(
          "```qreeShopBot Help page\n\n" +
          "NOTE: \n" +
          "links - you can provide direct link or normal sharing links from google and dropbox it will be automatically converted into direct ones\n\n" +
          "COMMANDS: \n\n" +
          "upload - !qre upload <url> \"<name>\" <region> <platform> <size> \n" +
          "example: !qre upload https://files.catbox.moe/au9pkx.cia \"Super Castlevania IV\" USA GBA 5MB \n\n" +
          "search - \n" +
          "invoke - \n```"
      )
    } else {
      return receivedMessage.channel.send(
          "```qreeShopBot Help page\n\n" +
          "NOTE: \n" +
          "links - you can provide direct link or normal sharing links from google and dropbox it will be automatically converted into direct ones\n\n" +
          "COMMANDS: \n\n" +
          "upload - "+ serverInvokers.get(receivedMessage.guild.id) +" upload <url> \"<name>\" <platform> <region> <size> \n" +
          "example: !qre upload https://files.catbox.moe/au9pkx.cia \"Super Castlevania IV\" USA GBA 5MB \n\n" +
          "search - \n" +
          "invoke - \n```"
      )
    }
  }

  if(primaryCommand === "upload"){
    return handleGameUpload(messageArguments, receivedMessage)
  }

  if(primaryCommand === "invoke"){
    return changeInvokeCommand(messageArguments, receivedMessage)
  }

  if(primaryCommand === "search"){
    return searchGame(messageArguments, receivedMessage)
  }

  return receivedMessage.channel.send(
      `Command not found`
  )

}

function changeInvokeCommand(messageArguments, receivedMessage) {
  if (receivedMessage.channel.type === 'dm'){
    return  receivedMessage.channel.send(
        `This command is available only in servers`
    )
  }

  if (messageArguments.length > 3){
    return  receivedMessage.channel.send(
      `Too much arguments for invoke command`
    )
  }

  if (messageArguments[1]) {
    serverInvokers.set(receivedMessage.guild.id, messageArguments[1])
    return  receivedMessage.channel.send(
      `Successfully changed your invoke command`
    )
  }

}

async function handleGameUpload(messageArguments, receivedMessage){
  let link

  if (messageArguments.length < 6){
    return  receivedMessage.channel.send(
        `invalid arguments for upload command`
    )
  }

  if (messageArguments[1].match(regexes.GDRIVE)){
    link = parseGDriveLink(messageArguments[1])
  } else if (messageArguments[1].match(regexes.DROPBOX)) {
    messageArguments[1].slice(-1) === "0" ? link = parseDropboxLink(messageArguments[1]) : link = messageArguments[1]
  } else {
    link = messageArguments[1]
  }

  if (!messageArguments[4].match(regexes.REGIONS)){
    return  receivedMessage.channel.send(
        `invalid arguments for upload command`
    )
  }

  if (link.match(regexes.URL)){
    const qr = createASCIIQrCode(link)
    const name = messageArguments[2].replace(/^"(.*)"$/, '$1')

    const {rows} = await findGame(name)
    if (rows.length === 0){
      await receivedMessage.channel.send(
          "```" + qr +
          "\nLink: " + link +
          "\n\nName: " + name +
          "\nPlatform: " + messageArguments[3] +
          "\nRegion: " + messageArguments[4] +
          "\nSize: " + messageArguments[5] +
          "```" +
          "```diff\n" +
          "+ This is how it will look, save in database it? Type yes/no" +
          "\n```"
      );
    } else {
      await receivedMessage.channel.send(
          "```" + qr +
          "\nLink: " + link +
          "\n\nName: " + name +
          "\nPlatform: " + messageArguments[3] +
          "\nRegion: " + messageArguments[4] +
          "\nSize: " + messageArguments[5] +
          "```" +
          "```diff\n" +
          "+ There are games with similar name, check by searching them first before uploading" +
          "\n```" +
          "```diff\n" +
          "+ This is how it will look, save in database? Type 'yes'/'no' or 'search' if you want to check about what games I was talking about :)" +
          "\n```"
      );
    }

    const collector = new Discord.MessageCollector(receivedMessage.channel, m => m.author.id === receivedMessage.author.id, { time: 60000 });
    collector.on('collect', message => {
      if (message.content === "yes") {
        receivedMessage.channel.send("Saving in database!");
        try {
          createQree(qr, link, name, messageArguments[3], messageArguments[4], messageArguments[5], receivedMessage.author.id)
        } catch (e) {
          console.log(e)
          receivedMessage.channel.send(
              "something went wrong, send it to developer: \n" +
              "```diff\n- " + e + "```"
          );
        }
        collector.stop()
      } else if (message.content === "no") {
        receivedMessage.channel.send("Ok try again later :P");
        collector.stop()
      } else if (message.content === "search") {
        receivedMessage.channel.send("```Ok displaying games that I have found, check your DM's, you can go back here and type 'yes'/'no' still```");
        rows.map(({qr_data, qr_link, name, platform, region , size}) => {
          receivedMessage.author.send(
              "```"+ qr_data +
              "\nLink: "+ qr_link +
              "\n\nName: "+  name +
              "\nPlatform: "+ platform +
              "\nRegion: "+ region +
              "\nSize: "+ size +
              "```")
        })
      }
    })

    collector.on('end', collected => {
      receivedMessage.channel.send("Upload session ended");
    });

  } else {
    return  receivedMessage.channel.send(
      `specify a valid url`
    )
  }
}

async function searchGame(messageArguments, receivedMessage){
  try {
    // const games = await findGame(messageArguments[1])
    console.log(messageArguments)
    if (messageArguments.length > 3){
      return  await receivedMessage.channel.send(
          `invalid arguments for search command`
      )
    }

    const name = messageArguments[1].replace(/^"(.*)"$/, '$1')
    const {rows} = await findGame(name)
    console.log(rows)
    if (rows.length === 0){
      await receivedMessage.channel.send(`I didn't find anything called ${messageArguments[1]}`);
    } else {
      await receivedMessage.channel.send(`I found some games, sending to you via PM to not spam here ;)`);

      const embeds = [];
      rows.map(({qr_data, qr_link, name, platform, region , size}, index) => {
        embeds.push(new MessageEmbed()
            .addField('Page', index + 1, )
            .addField('QR: ', "```"+ qr_data +"```")
            .addField('QR link: ', qr_link)
            .addField('Name: ', name)
            .addField('Platform: ', platform)
            .addField('Region: ', region)
            .addField('Size: ', size)
        );
      })

      new Embeds()
          .setArray(embeds)
          .setAuthorizedUsers([receivedMessage.author.id])
          .setChannel(receivedMessage.author)
          .setPageIndicator(true)
          .setPage(1)
          // Methods below are for customising all embeds
          .setTitle('Qr Code 3DS games search collection')
          .setDescription('==========================================================')
          .setFooter('==========================================================')
          .setColor(0xFF00AE)
          .build();
    }

    // receivedMessage.author.send(
    //     "```"+ qr_data +
    //     "\nLink: "+ qr_link +
    //     "\n\nName: "+  name +
    //     "\nPlatform: "+ platform +
    //     "\nRegion: "+ region +
    //     "\nSize: "+ size +
    //     "```")

    // console.log(games.fields.forEach(field => {
    //   console.log(field)
    // }))
  } catch (e) {
    console.log(e)
    await receivedMessage.channel.send(
        "something went wrong, send it to developer: \n" +
        "```diff\n- " + e + "```"
    );
  }
}
