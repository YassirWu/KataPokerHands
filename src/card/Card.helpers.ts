import Card, {
  CardSuit,
  CardValue,
  CARD_SUIT_CLUB,
  CARD_SUIT_DIAMOND,
  CARD_SUIT_HEART,
  CARD_SUIT_SPADE,
  CARD_VALUE_ACE,
  CARD_VALUE_KING,
  CARD_VALUE_QUEEN,
  CARD_VALUE_VALET,
} from "./Card.entity";

export const stringifyCard = (card: Card) => {
  return `${card.value}${card.suit}`;
};

const checkValueNumber = (value: number) => {
  if (value === 0 || value === 1) {
    throw new Error("checkValueNumber invalid input");
  }
};
const checkValueLetter = (value: string) => {
  if (
    ![
      CARD_VALUE_VALET,
      CARD_VALUE_QUEEN,
      CARD_VALUE_KING,
      CARD_VALUE_ACE,
    ].includes(value)
  ) {
    throw new Error("checkValueLetter invalid input");
  }
};

const parseValue = (value: string): CardValue => {
  // from 2 to 10
  const valueAsNumber = Number(value);

  if (!isNaN(valueAsNumber)) {
    checkValueNumber(valueAsNumber);
    return valueAsNumber as CardValue;
  }

  // J, Q, K, A
  checkValueLetter(value);

  return value as CardValue;
};

const checkSuit = (suit: string) => {
  if (
    ![
      CARD_SUIT_CLUB,
      CARD_SUIT_DIAMOND,
      CARD_SUIT_HEART,
      CARD_SUIT_SPADE,
    ].includes(suit)
  ) {
    throw new Error("checkSuit invalid input");
  }
};

export const parseCard = (stringifiedCard: string): Card => {
  const [value, suit] = stringifiedCard.split("");

  if (!value || !suit) {
    throw new Error("parseCard invalid input");
  }

  const parsedValue = parseValue(value);

  checkSuit(suit);

  return {
    value: parsedValue,
    suit: suit as CardSuit,
  };
};
