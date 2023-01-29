import { battlePokerHands } from "../battle/Battle.helpers";
import { parseCardDeck } from "../cardDesk/CardDeck.helpers";
import { POKER_HAND_TYPE_NAME_FULL_HOUSE } from "../pokerHand/PokerHand.entity";

describe("e2e", () => {
  it("should return the winner", () => {
    const firstPlayerInput = "2H 4S 4C 2D 4H";
    const secondPlayerInput = "2S 8S AS QS 3S";

    const firstPlayerCardDeck = parseCardDeck(firstPlayerInput);
    const secondPlayerCardDeck = parseCardDeck(secondPlayerInput);

    const result = battlePokerHands(
      { name: "Black", cardDeck: firstPlayerCardDeck },
      { name: "White", cardDeck: secondPlayerCardDeck }
    );

    expect(result.winner?.name).toBe("Black");
    expect(result.pokerHand.name).toBe(POKER_HAND_TYPE_NAME_FULL_HOUSE);
    expect(result.pokerHand.higherCard.value).toBe(4);
    expect(result.pokerHand.higherCard.suit).toBe("S");
  });
});
