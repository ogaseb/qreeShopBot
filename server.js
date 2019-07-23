require('dotenv').config()
import Discord from 'discord.js'
import qrCode from'qrcode-generator'
import {initializeDb} from './models/database'

void (async function () {
  try {
    await initializeDb()
    console.log("DB -> init DB")
  }
  catch (e) {
    console.log(e)
  }
})()

const client = new Discord.Client()
let botInvoker = process.env.BOT_DEFAULT_INVOKE

client.on('ready', () => {
  // console.log("Connected as " + client.user.tag)
  // console.log("Servers:")
  // client.guilds.forEach((guild) => {
  //   console.log(" - " + guild.name)
  //   guild.channels.forEach((channel) => {
  //     console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
  //   })
  // })
})

client.on('message', (receivedMessage) => {
  if (receivedMessage.author === client.user) { // Prevent bot from responding to its own messages
    return
  }

  if (receivedMessage.content.startsWith(`${botInvoker}`)) {
    processCommand(receivedMessage)
  }
})

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(5) // Remove the leading exclamation mark
  let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
  let messageArguments = fullCommand.match(/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?|\w+|"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'/g);
  let primaryCommand = messageArguments[0] // The first word directly after the exclamation is the command
  // arguments = arguments.slice(1) // All other words are arguments/parameters/options for the command
  // let messageArguments = splitCommand.slice(1)

  console.log(messageArguments)

  if(primaryCommand === ""){
    receivedMessage.channel.send(
      `You need to specify which command you want to use type "${botInvoker} help" to display available commands`
    )
  }

  if(primaryCommand === "help"){
    receivedMessage.channel.send(
      "```Help page: \n\n COMMANDS: \n\n upload - \n search - ```"
    )
  }

  if(primaryCommand === "upload"){
    handleGameUpload(messageArguments, receivedMessage)
  }

  console.log("Full command: " + fullCommand)
  console.log("Command received: " + primaryCommand)
  console.log("split command: " + splitCommand)
  console.log("Arguments: " + arguments) // There may not be any arguments

}

function handleGameUpload(messageArguments, receivedMessage){
  let link
  const urlExpression = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g;
  const dropboxExpression = /\b(\w*dropbox\w*)\b/g

  if (messageArguments.length > 5){
    return  receivedMessage.channel.send(
        `Too much arguments for upload command`
    )
  }

  if (messageArguments[1].match(dropboxExpression)){
      messageArguments[1].slice(-1) === "0" ? link = parseDropboxLink(messageArguments[1]) : link = messageArguments[1]
  }

  //(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\w+|"(?:\\"|[^"])+"|'(?:\\'|[^"])+'|\w+


  if (link.match(urlExpression)){
    let qr = qrCode(0, 'M');
    qr.addData(`${link}`);
    qr.make();
    console.log(qr.createASCII())
    receivedMessage.channel.send(
      "```"+ qr.createASCII()  +"\n\nName: "+  messageArguments[2] + "\nRegion: "+ messageArguments[3] +"\nSize: "+  messageArguments[4] +"```"
    )
  } else {
    return  receivedMessage.channel.send(
      `Specify a valid url`
    )
  }
  // messageArguments.shift()
  // let continueArguments = messageArguments.join(" ")
  // continueArguments = continueArguments.match(/\w+|"(?:\\"|[^"])+"|'(?:\\'|[^"])+'/g);
  // console.log(continueArguments)


  // console.log(messageArguments[0], messageArguments[1])
}

function parseDropboxLink(link){
  let string = link;
  string = string.split("/");
  string[5] = '?dl=1';
  string = string.join("/")
  return string
}


// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"

client.login(process.env.BOT_TOKEN)