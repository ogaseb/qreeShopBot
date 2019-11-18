module.exports.changeInvokeCommand = function(
  messageArguments,
  receivedMessage,
  serverInvokers
) {
  if (receivedMessage.channel.type === "dm") {
    return receivedMessage.channel.send(
      `This command is available only in servers`
    );
  }

  if (messageArguments.length > 3) {
    return receivedMessage.channel.send(
      `Too much arguments for invoke command`
    );
  }

  if (messageArguments[1]) {
    serverInvokers.set(receivedMessage.guild.id, messageArguments[1]);
    return receivedMessage.channel.send(
      `Successfully changed your invoke command`
    );
  }
};

// export function changeInvokeCommand(
//   messageArguments,
//   receivedMessage,
//   serverInvokers
// ) {
//
// }
