import Card, {
  CardSuit,
  CardValue,
  CARD_VALUE_ACE,
  CARD_VALUE_KING,
  CARD_VALUE_QUEEN,
  CARD_VALUE_VALET,
} from "./Card.entity";

export const stringifyCard = (card: Card) => {
  return `${card.value}${card.suit}`;
};

const parseValue = (value: string): CardValue => {
  // from 2 to 10
  const valueAsNumber = Number(value);

  if (!isNaN(valueAsNumber)) {
    return valueAsNumber as CardValue;
  }

  const mappingValue: { [key: string]: CardValue } = {
    J: CARD_VALUE_VALET,
    Q: CARD_VALUE_QUEEN,
    K: CARD_VALUE_KING,
    A: CARD_VALUE_ACE,
  };

  return mappingValue[value];
};

export const parseCard = (stringifiedCard: string): Card => {
  const [value, suit] = stringifiedCard.split("");

  return {
    value: parseValue(value),
    suit: suit as CardSuit,
  };
};
