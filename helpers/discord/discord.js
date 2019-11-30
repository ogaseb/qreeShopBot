/**
 * returns array of all messages from specific channel, it bypass the discord limitation of 100 messages
 * @param channel
 * @param limit
 * @returns {Promise<[]>}
 */
async function limitlessFetchMessages(channel, limit = 9000) {
  const sum_messages = [];
  let last_id;

  while (true) {
    const options = { limit: 100 };
    if (last_id) {
      options.before = last_id;
    }
    console.log(channel.messages);
    const messages = await channel.messages.fetch(options);
    sum_messages.push(...messages.array());
    last_id = messages.last().id;

    if (messages.size !== 100 || sum_messages >= limit) {
      break;
    }
  }

  return sum_messages;
}

module.exports = {
  limitlessFetchMessages
};
