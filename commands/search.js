import { findGame } from "../db/db_qree";
import { createEmbeddedAnswer } from "../helpers/helpers";

export async function searchGame(messageArguments, receivedMessage) {
  try {
    // const games = await findGame(messageArguments[1])
    console.log(messageArguments);
    if (messageArguments.length !== 2) {
      return await receivedMessage.channel.send(
        `invalid arguments for search command`
      );
    }

    const name = messageArguments[1].replace(/^"(.*)"$/, "$1");
    const { rows } = await findGame(name);
    if (rows.length === 0) {
      await receivedMessage.channel.send(
        `I didn't find anything called \`${messageArguments[1]}\``
      );
    } else {
      const QrCodesSearchResults = await createEmbeddedAnswer(
        rows,
        receivedMessage
      );
      await QrCodesSearchResults.build();
    }
  } catch (e) {
    console.log(e);
    await receivedMessage.channel.send(
      "something went wrong, send it to developer: \n" +
        "```diff\n- " +
        e +
        "```"
    );
  }
}
