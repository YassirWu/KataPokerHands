import { Card } from "../card";
import { CardDeskProperties } from "../cardDesk/CardDeck.entity";
import {
  POKER_HAND_TYPE_NAME_FLUSH,
  POKER_HAND_TYPE_NAME_FOUR_OF_KIND,
  POKER_HAND_TYPE_NAME_FULL_HOUSE,
  POKER_HAND_TYPE_NAME_HIGH_CARD,
  POKER_HAND_TYPE_NAME_PAIR,
  POKER_HAND_TYPE_NAME_STRAIGHT,
  POKER_HAND_TYPE_NAME_STRAIGHT_FLUSH,
  POKER_HAND_TYPE_NAME_THREE_OF_KIND,
} from "./PokerHand.entity";
import {
  highCardPokerHand,
  isFlushPokerHand,
  isFourOfAKindPokerHand,
  isFullHousePokerHand,
  isPairPokerHand,
  isStraightPokerHand,
  isThreeOfAKindPokerHand,
  straightFullPokerHand,
} from "./PokerHand.helpers";

const defaultCardDeskProperties: CardDeskProperties = {
  isStraight: false,
  isFlush: false,
  highestCardOnCardDesk: { suit: "C", value: 5 },
  duplicatedValueCards: { pairs: [], threes: [], fours: [] },
};

describe("straightFullPokerHand", () => {
  it("should return poker hand when straight and flush", () => {
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      isStraight: true,
      isFlush: true,
      highestCardOnCardDesk: { suit: "C", value: 5 },
    };

    const result = straightFullPokerHand(input);

    expect(result).not.toBeNull();
    expect(result?.name).toBe(POKER_HAND_TYPE_NAME_STRAIGHT_FLUSH);
    expect(result?.higherCard).toStrictEqual({ suit: "C", value: 5 });
  });

  it("should return null when straight and no flush", () => {
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      isStraight: true,
      isFlush: false,
      highestCardOnCardDesk: { suit: "C", value: 5 },
    };

    expect(straightFullPokerHand(input)).toBeNull();
  });

  it("should return null when no straight and flush", () => {
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      isStraight: false,
      isFlush: true,
      highestCardOnCardDesk: { suit: "C", value: 5 },
    };

    expect(straightFullPokerHand(input)).toBeNull();
  });

  it("should return null when no straight and no flush", () => {
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      isStraight: false,
      isFlush: false,
      highestCardOnCardDesk: { suit: "C", value: 5 },
    };

    expect(straightFullPokerHand(input)).toBeNull();
  });
});

describe("isFourOfAKindPokerHand", () => {
  it("should return poker hand when four same cards", () => {
    const four: Card[] = [
      { value: 5, suit: "C" },
      { value: 5, suit: "D" },
      { value: 5, suit: "D" },
      { value: 5, suit: "C" },
    ];
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      duplicatedValueCards: { pairs: [], threes: [], fours: [four] },
    };

    const result = isFourOfAKindPokerHand(input);

    expect(result).not.toBeNull();
    expect(result?.name).toBe(POKER_HAND_TYPE_NAME_FOUR_OF_KIND);
    expect(result?.higherCard).toStrictEqual({ suit: "C", value: 5 });
  });

  it("should return null when no fours", () => {
    expect(isFourOfAKindPokerHand(defaultCardDeskProperties)).toBeNull();
  });
});

describe("isFullHousePokerHand", () => {
  it("should return poker hand when one three and one pair", () => {
    const pair: Card[] = [
      { value: 2, suit: "C" },
      { value: 2, suit: "D" },
    ];
    const three: Card[] = [
      { value: 5, suit: "C" },
      { value: 5, suit: "D" },
      { value: 5, suit: "D" },
    ];
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      duplicatedValueCards: { pairs: [pair], threes: [three], fours: [] },
    };

    const result = isFullHousePokerHand(input);

    expect(result).not.toBeNull();
    expect(result?.name).toBe(POKER_HAND_TYPE_NAME_FULL_HOUSE);
    expect(result?.higherCard).toStrictEqual({ suit: "C", value: 5 });
  });

  it("should return poker hand when one three and no pair", () => {
    const three: Card[] = [
      { value: 5, suit: "C" },
      { value: 5, suit: "D" },
      { value: 5, suit: "D" },
    ];
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      duplicatedValueCards: { pairs: [], threes: [three], fours: [] },
    };

    expect(isFullHousePokerHand(input)).toBeNull();
  });

  it("should return poker hand when no three and one pair", () => {
    const pair: Card[] = [
      { value: 5, suit: "C" },
      { value: 5, suit: "D" },
    ];
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      duplicatedValueCards: { pairs: [pair], threes: [], fours: [] },
    };

    expect(isFullHousePokerHand(input)).toBeNull();
  });

  it("should return null when no three and no pair", () => {
    expect(isFullHousePokerHand(defaultCardDeskProperties)).toBeNull();
  });
});

describe("isFlushPokerHand", () => {
  it("should return poker hand when flush", () => {
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      isFlush: true,
    };

    const result = isFlushPokerHand(input);

    expect(result).not.toBeNull();
    expect(result?.name).toBe(POKER_HAND_TYPE_NAME_FLUSH);
    expect(result?.higherCard).toStrictEqual({ suit: "C", value: 5 });
  });

  it("should return null when no flush", () => {
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      isFlush: false,
    };
    expect(isFlushPokerHand(input)).toBeNull();
  });
});

describe("isStraightPokerHand", () => {
  it("should return poker hand when straight", () => {
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      isStraight: true,
    };

    const result = isStraightPokerHand(input);

    expect(result).not.toBeNull();
    expect(result?.name).toBe(POKER_HAND_TYPE_NAME_STRAIGHT);
    expect(result?.higherCard).toStrictEqual({ suit: "C", value: 5 });
  });

  it("should return null when no straight", () => {
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      isStraight: false,
    };
    expect(isStraightPokerHand(input)).toBeNull();
  });
});

describe("isThreeOfAKindPokerHand", () => {
  it("should return poker hand when one three", () => {
    const three: Card[] = [
      { value: 5, suit: "C" },
      { value: 5, suit: "D" },
      { value: 5, suit: "D" },
    ];
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      duplicatedValueCards: { pairs: [], threes: [three], fours: [] },
    };

    const result = isThreeOfAKindPokerHand(input);

    expect(result).not.toBeNull();
    expect(result?.name).toBe(POKER_HAND_TYPE_NAME_THREE_OF_KIND);
    expect(result?.higherCard).toStrictEqual({ suit: "C", value: 5 });
  });

  it("should return null when no three", () => {
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      duplicatedValueCards: { pairs: [], threes: [], fours: [] },
    };
    expect(isThreeOfAKindPokerHand(input)).toBeNull();
  });
});

describe("isPairPokerHand", () => {
  it("should return poker hand when one pair", () => {
    const pair: Card[] = [
      { value: 5, suit: "C" },
      { value: 5, suit: "D" },
    ];
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      duplicatedValueCards: { pairs: [pair], threes: [], fours: [] },
    };

    const result = isPairPokerHand(input);

    expect(result).not.toBeNull();
    expect(result?.name).toBe(POKER_HAND_TYPE_NAME_PAIR);
    expect(result?.higherCard).toStrictEqual({ suit: "C", value: 5 });
  });

  it("should return null when no pair", () => {
    const input: CardDeskProperties = {
      ...defaultCardDeskProperties,
      duplicatedValueCards: { pairs: [], threes: [], fours: [] },
    };
    expect(isPairPokerHand(input)).toBeNull();
  });
});

describe("highCardPokerHand", () => {
  it("should return poker hand", () => {
    const result = highCardPokerHand(defaultCardDeskProperties);

    expect(result).not.toBeNull();
    expect(result?.name).toBe(POKER_HAND_TYPE_NAME_HIGH_CARD);
    expect(result?.higherCard).toStrictEqual({ suit: "C", value: 5 });
  });
});
