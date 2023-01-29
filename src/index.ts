import { battlePokerHands } from "./battle/Battle.helpers";
import { parseCardDeck } from "./cardDesk/CardDeck.helpers";

export { stringifyCard } from "./card";

const playPokerHand = (firstPlayerInput: string, secondPlayerInput: string) => {
  const firstPlayerCardDeck = parseCardDeck(firstPlayerInput);
  const secondPlayerCardDeck = parseCardDeck(secondPlayerInput);

  const result = battlePokerHands(
    { name: "Player one", cardDeck: firstPlayerCardDeck },
    { name: "Player two", cardDeck: secondPlayerCardDeck }
  );

  return result;
};

export default playPokerHand;
