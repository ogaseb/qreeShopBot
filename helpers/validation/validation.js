require("dotenv").config();

/**
 * checks if incoming message is from direct message
 * @param receivedMessage
 * @returns {boolean}
 */
function checkIfDM(receivedMessage) {
  return receivedMessage.channel.type === "dm";
}

function validateGuilds(receivedMessage) {
  if (!checkIfDM(receivedMessage)) {
    return !!process.env.BOT_PERMISSIONS_GUILD.includes(
      receivedMessage.guild.id
    );
  }
}

function validatePermissions(receivedMessage) {
  if (!checkIfDM(receivedMessage)) {
    return !!receivedMessage.member.roles.some(r =>
      process.env.BOT_PERMISSIONS_ROLES.includes(r.name)
    );
  }
}

function validateAdmin(receivedMessage) {
  if (!checkIfDM(receivedMessage)) {
    return !!receivedMessage.member.roles.some(r =>
      process.env.BOT_PERMISSIONS_ADMIN.includes(r.name)
    );
  }
}

module.exports = {
  validateAdmin,
  validatePermissions,
  validateGuilds,
  checkIfDM
};
