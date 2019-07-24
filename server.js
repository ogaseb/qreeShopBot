require('dotenv').config()
import Discord from 'discord.js'
import {parseGDriveLink, parseDropboxLink, createASCIIQrCode, regexes} from "./helpers/helpers";
import {initializeDb} from './models/database'
import {createQree, findGame} from './db/db_qree'


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

const client = new Discord.Client()
let botInvoker = process.env.BOT_DEFAULT_INVOKE
let serverInvokers = new Map()

client.on('ready', () => {
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
})

client.on('message', (receivedMessage) => {
  console.log(receivedMessage.guild.id)
  if (receivedMessage.author === client.user) { // Prevent bot from responding to its own messages
    return
  }

  if (receivedMessage.content.startsWith(`${serverInvokers.get(receivedMessage.guild.id)}`)) {
    processCommand(receivedMessage)
  }
})

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(serverInvokers.get(receivedMessage.guild.id).length + 1)
  let messageArguments = fullCommand.match(regexes.ARGUMENTS)
  let primaryCommand
  if (messageArguments !== null && messageArguments.length) {
    primaryCommand = messageArguments[0] // The first word directly after the exclamation is the command
  }

  if(primaryCommand === "" || primaryCommand === null || primaryCommand === undefined){
    return receivedMessage.channel.send(
      `You need to specify which command you want to use type "${serverInvokers.get(receivedMessage.guild.id)} help" to display available commands`
    )
  }

  if(primaryCommand === "help"){
    return receivedMessage.channel.send(
      "```qreeShopBot Help page\n\n" +
      "NOTE: \n" +
      "links - you can provide direct link or normal sharing links from google and dropbox it will be automatically converted into direct ones\n\n" +
      "COMMANDS: \n\n" +
      "upload - "+ serverInvokers.get(receivedMessage.guild.id) +" upload <url> \"<name>\" <region> <console> <size> \n" +
      "example: !qre upload https://files.catbox.moe/au9pkx.cia \"Super Castlevania IV\" USA GBA 5MB \n\n" +
      "search - \n" +
      "invoke - \n```"
    )
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

}

function changeInvokeCommand(messageArguments, receivedMessage) {
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


  if (link.match(regexes.URL)){
    const qr = createASCIIQrCode(link)

    receivedMessage.channel.send(
      "```"+ qr +
      "\nLink: "+ link +
      "\n\nName: "+  messageArguments[2] +
      "\nRegion: "+ messageArguments[3] +
      "\nConsole: "+ messageArguments[4] +
      "\nSize: "+  messageArguments[5] +
      "```"
    );

    try {
      await createQree(qr, link, messageArguments[2], messageArguments[3], messageArguments[4], messageArguments[5], receivedMessage.author.id)
    } catch (e) {
      console.log(e)
      receivedMessage.channel.send(
        "something went wrong, send it to developer: \n" +
        "```diff\n- " + e + "```"
      );
    }

  } else {
    return  receivedMessage.channel.send(
      `specify a valid url`
    )
  }
}

async function searchGame(messageArguments, receivedMessage){
  try {
    // const games = await findGame(messageArguments[1])
    const {rows} = await findGame(messageArguments[1])
    //TODO changing console to diffrent name cause of confilcts
    rows.map(({qr_data, qr_link, name, region, console , size}) => {
      console.log(qr_data)
      receivedMessage.channel.send(
        "```"+ qr_data +
        "\nLink: "+ qr_link +
        "\n\nName: "+  name +
        "\nRegion: "+ region +
        "\nConsole: "+ console +
        "\nSize: "+ size +
        "```"
      );
    })

    // console.log(games.fields.forEach(field => {
    //   console.log(field)
    // }))
  } catch (e) {
    console.log(e)
    receivedMessage.channel.send(
      "something went wrong, send it to developer: \n" +
      "```diff\n- " + e + "```"
    );
  }
}
