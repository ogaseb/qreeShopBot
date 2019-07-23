require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
let botInvoker = process.env.BOT_DEFAULT_INVOKE


request("", function (err, response, body) {
  if (err){

  }
  console.log(body)
  // do stuff with body
});

client.on('ready', () => {
  console.log("Connected as " + client.user.tag)
  console.log("Servers:")
  client.guilds.forEach((guild) => {
    console.log(" - " + guild.name)
    guild.channels.forEach((channel) => {
      console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
    })
  })
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
  let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
  let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

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
  console.log("Full command: " + fullCommand)
  console.log("Command received: " + primaryCommand)
  console.log("split command: " + splitCommand)
  console.log("Arguments: " + arguments) // There may not be any arguments

}
// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"

client.login(process.env.BOT_TOKEN)