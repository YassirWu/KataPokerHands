import playPokerHand from "..";
import {
  POKER_HAND_TYPE_NAME_FULL_HOUSE,
  POKER_HAND_TYPE_NAME_HIGH_CARD,
} from "../pokerHand/PokerHand.entity";

// Only the four tests from: https://codingdojo.org/kata/PokerHands/

describe("e2e", () => {
  it("First sample example", () => {
    const firstPlayerInput = "2H 3D 5S 9C KD";
    const secondPlayerInput = "2C 3H 4S 8C AH";

    const result = playPokerHand(firstPlayerInput, secondPlayerInput);

    expect(result.winner?.name).toBe("Player two");
    expect(result.pokerHand.name).toBe(POKER_HAND_TYPE_NAME_HIGH_CARD);
    expect(result.pokerHand.higherCard.value).toBe("A");
  });

  it("Second sample example", () => {
    const firstPlayerInput = "2H 4S 4C 2D 4H";
    const secondPlayerInput = "2S 8S AS QS 3S";

    const result = playPokerHand(firstPlayerInput, secondPlayerInput);

    expect(result.winner?.name).toBe("Player one");
    expect(result.pokerHand.name).toBe(POKER_HAND_TYPE_NAME_FULL_HOUSE);
    expect(result.pokerHand.higherCard.value).toBe(4);
  });

  it("Third sample example", () => {
    const firstPlayerInput = "2H 3D 5S 9C KD";
    const secondPlayerInput = "2C 3H 4S 8C KH";

    const result = playPokerHand(firstPlayerInput, secondPlayerInput);

    expect(result.winner?.name).toBe("Player one");
    expect(result.pokerHand.name).toBe(POKER_HAND_TYPE_NAME_HIGH_CARD);
    expect(result.pokerHand.higherCard.value).toBe("K");
  });

  it("Fourth sample example", () => {
    const firstPlayerInput = "2H 3D 5S 9C KD";
    const secondPlayerInput = "2D 3H 5C 9S KH";

    const result = playPokerHand(firstPlayerInput, secondPlayerInput);

    expect(result.winner).toBeNull();
    expect(result.pokerHand.name).toBe(POKER_HAND_TYPE_NAME_HIGH_CARD);
    expect(result.pokerHand.higherCard.value).toBe("K");
  });
});
