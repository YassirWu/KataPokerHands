import CardDeck from "./CardDeck.entity";
import {
  buildCardDeckProperties,
  getDuplicatedValueCards,
  getHigherCard,
  getIsFlush,
  getIsStraight,
  parseCardDeck,
  sortCardsByIndex,
} from "./CardDeck.helpers";

describe("parseCardDeck", () => {
  it("should parse card desk", () => {
    expect(parseCardDeck("2H 3D 5S 9C KD")).toStrictEqual([
      { value: 2, suit: "H" },
      { value: 3, suit: "D" },
      { value: 5, suit: "S" },
      { value: 9, suit: "C" },
      { value: "K", suit: "D" },
    ]);

    expect(parseCardDeck("2C 3H 4S 8C AH")).toStrictEqual([
      { value: 2, suit: "C" },
      { value: 3, suit: "H" },
      { value: 4, suit: "S" },
      { value: 8, suit: "C" },
      { value: "A", suit: "H" },
    ]);

    expect(parseCardDeck("2H 4S 4C 2D 4H")).toStrictEqual([
      { value: 2, suit: "H" },
      { value: 4, suit: "S" },
      { value: 4, suit: "C" },
      { value: 2, suit: "D" },
      { value: 4, suit: "H" },
    ]);
  });
});

describe("getHigherCard", () => {
  it("should return higher card with only numbers", () => {
    const cards: CardDeck = [
      { value: 2, suit: "C" },
      { value: 9, suit: "D" },
      { value: 6, suit: "H" },
      { value: 4, suit: "D" },
      { value: 5, suit: "S" },
    ];

    expect(getHigherCard(cards)).toStrictEqual({ value: 9, suit: "D" });
  });

  it("should return higher card with special cards", () => {
    const cards: CardDeck = [
      { value: "K", suit: "C" },
      { value: "J", suit: "D" },
      { value: "A", suit: "H" },
      { value: "Q", suit: "D" },
      { value: "J", suit: "S" },
    ];

    expect(getHigherCard(cards)).toStrictEqual({ value: "A", suit: "H" });
  });

  it("should return higher card with special cards and numbers", () => {
    const cards: CardDeck = [
      { value: 2, suit: "C" },
      { value: 9, suit: "D" },
      { value: 6, suit: "H" },
      { value: "Q", suit: "D" },
      { value: "J", suit: "S" },
    ];

    expect(getHigherCard(cards)).toStrictEqual({ value: "Q", suit: "D" });
  });
});

describe("getDuplicatedValueCards", () => {
  it("should return the single pair", () => {
    const cards: CardDeck = [
      { value: 2, suit: "C" },
      { value: 9, suit: "D" },
      { value: "J", suit: "H" },
      { value: "Q", suit: "D" },
      { value: "J", suit: "S" },
    ];

    const result = getDuplicatedValueCards(cards);

    expect(result.pairs).toStrictEqual([
      [
        { value: "J", suit: "H" },
        { value: "J", suit: "S" },
      ],
    ]);
    expect(result.threes).toStrictEqual([]);
    expect(result.fours).toStrictEqual([]);
  });

  it("should return two pairs", () => {
    const cards: CardDeck = [
      { value: 2, suit: "C" },
      { value: 9, suit: "D" },
      { value: "J", suit: "H" },
      { value: 9, suit: "H" },
      { value: "J", suit: "S" },
    ];

    const result = getDuplicatedValueCards(cards);

    expect(result.pairs).toStrictEqual([
      [
        { value: 9, suit: "D" },
        { value: 9, suit: "H" },
      ],
      [
        { value: "J", suit: "H" },
        { value: "J", suit: "S" },
      ],
    ]);
    expect(result.threes).toStrictEqual([]);
    expect(result.fours).toStrictEqual([]);
  });

  it("should return one three", () => {
    const cards: CardDeck = [
      { value: 2, suit: "C" },
      { value: "J", suit: "D" },
      { value: "J", suit: "H" },
      { value: 9, suit: "H" },
      { value: "J", suit: "S" },
    ];

    const result = getDuplicatedValueCards(cards);

    expect(result.pairs).toStrictEqual([]);
    expect(result.threes).toStrictEqual([
      [
        { value: "J", suit: "D" },
        { value: "J", suit: "H" },
        { value: "J", suit: "S" },
      ],
    ]);
    expect(result.fours).toStrictEqual([]);
  });

  it("should return one three and one double", () => {
    const cards: CardDeck = [
      { value: 9, suit: "C" },
      { value: "J", suit: "D" },
      { value: "J", suit: "H" },
      { value: 9, suit: "H" },
      { value: "J", suit: "S" },
    ];

    const result = getDuplicatedValueCards(cards);

    expect(result.pairs).toStrictEqual([
      [
        { value: 9, suit: "C" },
        { value: 9, suit: "H" },
      ],
    ]);
    expect(result.threes).toStrictEqual([
      [
        { value: "J", suit: "D" },
        { value: "J", suit: "H" },
        { value: "J", suit: "S" },
      ],
    ]);
    expect(result.fours).toStrictEqual([]);
  });

  it("should return one four", () => {
    const cards: CardDeck = [
      { value: "J", suit: "D" },
      { value: "J", suit: "H" },
      { value: 9, suit: "C" },
      { value: "J", suit: "C" },
      { value: "J", suit: "S" },
    ];

    const result = getDuplicatedValueCards(cards);

    expect(result.pairs).toStrictEqual([]);
    expect(result.threes).toStrictEqual([]);
    expect(result.fours).toStrictEqual([
      [
        { value: "J", suit: "D" },
        { value: "J", suit: "H" },
        { value: "J", suit: "C" },
        { value: "J", suit: "S" },
      ],
    ]);
  });

  it("should return empty arrays when no duplicate card values", () => {
    const cards: CardDeck = [
      { value: 2, suit: "C" },
      { value: 9, suit: "D" },
      { value: 7, suit: "H" },
      { value: "Q", suit: "D" },
      { value: "J", suit: "S" },
    ];

    const result = getDuplicatedValueCards(cards);

    expect(result.pairs).toStrictEqual([]);
    expect(result.threes).toStrictEqual([]);
    expect(result.fours).toStrictEqual([]);
  });
});

describe("getIsStraight", () => {
  it("should return true when there are 5 consecutives values", () => {
    expect(
      getIsStraight([
        { value: 2, suit: "C" },
        { value: 6, suit: "D" },
        { value: 3, suit: "H" },
        { value: 5, suit: "D" },
        { value: 4, suit: "S" },
      ])
    ).toBeTruthy();

    expect(
      getIsStraight([
        { value: "K", suit: "C" },
        { value: 10, suit: "D" },
        { value: "A", suit: "H" },
        { value: "Q", suit: "D" },
        { value: "J", suit: "S" },
      ])
    ).toBeTruthy();

    expect(
      getIsStraight([
        { value: "J", suit: "C" },
        { value: 10, suit: "D" },
        { value: "Q", suit: "H" },
        { value: 8, suit: "D" },
        { value: 9, suit: "S" },
      ])
    ).toBeTruthy();
  });

  it("should return false when there are not 5 consecutives values", () => {
    expect(
      getIsStraight([
        { value: 2, suit: "C" },
        { value: 7, suit: "D" },
        { value: 3, suit: "H" },
        { value: 9, suit: "D" },
        { value: 4, suit: "S" },
      ])
    ).toBeFalsy();

    expect(
      getIsStraight([
        { value: "K", suit: "C" },
        { value: 9, suit: "D" },
        { value: "A", suit: "H" },
        { value: "Q", suit: "D" },
        { value: "A", suit: "S" },
      ])
    ).toBeFalsy();

    expect(
      getIsStraight([
        { value: "J", suit: "C" },
        { value: 10, suit: "D" },
        { value: "Q", suit: "H" },
        { value: 9, suit: "D" },
        { value: 9, suit: "S" },
      ])
    ).toBeFalsy();
  });
});

describe("getIsFlush", () => {
  it("should return true when same suit for the 5 card", () => {
    expect(
      getIsFlush([
        { value: 2, suit: "C" },
        { value: 6, suit: "C" },
        { value: 3, suit: "C" },
        { value: 5, suit: "C" },
        { value: 4, suit: "C" },
      ])
    ).toBeTruthy();

    expect(
      getIsFlush([
        { value: 2, suit: "D" },
        { value: 6, suit: "D" },
        { value: 3, suit: "D" },
        { value: 5, suit: "D" },
        { value: 4, suit: "D" },
      ])
    ).toBeTruthy();

    expect(
      getIsFlush([
        { value: 2, suit: "H" },
        { value: 6, suit: "H" },
        { value: 3, suit: "H" },
        { value: 5, suit: "H" },
        { value: 4, suit: "H" },
      ])
    ).toBeTruthy();

    expect(
      getIsFlush([
        { value: 2, suit: "S" },
        { value: 6, suit: "S" },
        { value: 3, suit: "S" },
        { value: 5, suit: "S" },
        { value: 4, suit: "S" },
      ])
    ).toBeTruthy();
  });
  it("should return true when same suit for the 5 card", () => {
    expect(
      getIsFlush([
        { value: 2, suit: "C" },
        { value: 6, suit: "H" },
        { value: 3, suit: "C" },
        { value: 5, suit: "C" },
        { value: 4, suit: "C" },
      ])
    ).toBeFalsy();

    expect(
      getIsFlush([
        { value: 2, suit: "D" },
        { value: 6, suit: "S" },
        { value: 3, suit: "D" },
        { value: 5, suit: "C" },
        { value: 4, suit: "H" },
      ])
    ).toBeFalsy();
  });
});

describe("buildCardDeckProperties", () => {
  it("should return card deck properties", () => {
    const cardDeck: CardDeck = [
      { value: 2, suit: "C" },
      { value: 6, suit: "C" },
      { value: 3, suit: "C" },
      { value: 5, suit: "C" },
      { value: 4, suit: "C" },
    ];

    const result = buildCardDeckProperties(cardDeck);
    expect(result.isFlush).toBeTruthy();
    expect(result.isStraight).toBeTruthy();
    expect(result.duplicatedValueCards.pairs.length).toBe(0);
    expect(result.duplicatedValueCards.threes.length).toBe(0);
    expect(result.duplicatedValueCards.fours.length).toBe(0);
    expect(result.highestCardOnCardDesk.suit).toBe("C");
    expect(result.highestCardOnCardDesk.value).toBe(6);
  });
});

describe("sortCardsByIndex", () => {
  it("should sort cards", () => {
    const cardDeck: CardDeck = [
      { value: 2, suit: "H" },
      { value: 6, suit: "C" },
      { value: 3, suit: "D" },
      { value: 5, suit: "C" },
      { value: 4, suit: "S" },
    ];

    const result = sortCardsByIndex(cardDeck);
    expect(result).toStrictEqual([
      { value: 2, suit: "H" },
      { value: 3, suit: "D" },
      { value: 4, suit: "S" },
      { value: 5, suit: "C" },
      { value: 6, suit: "C" },
    ]);
  });
});
