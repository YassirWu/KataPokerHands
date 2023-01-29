import Card, { CardValue } from "../card/Card.entity";
import { parseCard } from "../card/Card.helpers";
import CardDeck, {
  CardDeskProperties,
  DuplicatedValueCards,
} from "./CardDeck.entity";

export const parseCardDeck = (stringifiedCardDesk: string): CardDeck => {
  const stringifiedCards = stringifiedCardDesk.trim().split(" ");

  if (stringifiedCards.length !== 5) {
    throw new Error("parseCardDeck invalid input");
  }

  return stringifiedCards.map((stringifiedCard) =>
    parseCard(stringifiedCard)
  ) as CardDeck;
};

export const mappingCardValueByIndex: { [key in CardValue]: number } = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

export const sortCardsByIndex = (cards: Card[]) => {
  const sortedCards = [...cards].sort((a, b) => {
    return mappingCardValueByIndex[a.value] > mappingCardValueByIndex[b.value]
      ? 1
      : -1;
  });

  return sortedCards;
};

export const getHigherCard = (cards: CardDeck | Card[]) => {
  const sortedCardsByIndex = sortCardsByIndex(cards);
  const higherCard = sortedCardsByIndex[sortedCardsByIndex.length - 1];
  return higherCard;
};

export const getDuplicatedValueCards = (
  cards: CardDeck
): DuplicatedValueCards => {
  const cardsGroupsByValue = cards.reduce((previousValue, currentValue) => {
    return {
      ...previousValue,
      [currentValue.value]: previousValue[currentValue.value]
        ? [...previousValue[currentValue.value], currentValue]
        : [currentValue],
    };
  }, {} as { [key: string | number]: Card[] });

  const pairs: Card[][] = [];
  const threes: Card[][] = [];
  const fours: Card[][] = [];

  Object.keys(cardsGroupsByValue).forEach((cardValue) => {
    const group = cardsGroupsByValue[cardValue];
    const length = group.length;
    if (length === 2) {
      pairs.push(group);
      return;
    }
    if (length === 3) {
      threes.push(group);
      return;
    }
    if (length === 4) {
      fours.push(group);
    }
  });

  return { pairs, threes, fours };
};

export const getIsStraight = (cards: CardDeck) => {
  const sortedCardsByIndex = sortCardsByIndex(cards);

  for (let i = 1; i < sortedCardsByIndex.length; i++) {
    const previousCardOnArray = sortedCardsByIndex[i - 1];
    const currentCardOnArray = sortedCardsByIndex[i];

    const indexPreviousValue =
      mappingCardValueByIndex[previousCardOnArray.value];
    const indexCurrentValue = mappingCardValueByIndex[currentCardOnArray.value];

    if (indexPreviousValue + 1 !== indexCurrentValue) {
      return false;
    }
  }

  return true;
};

export const getIsFlush = (cards: CardDeck) => {
  const suitOfFirstCard = cards[0].suit;

  return cards.every((card) => card.suit === suitOfFirstCard);
};

export const buildCardDeckProperties = (
  cards: CardDeck
): CardDeskProperties => {
  return {
    duplicatedValueCards: getDuplicatedValueCards(cards),
    isStraight: getIsStraight(cards),
    isFlush: getIsFlush(cards),
    highestCardOnCardDesk: getHigherCard(cards),
    sortedCards: sortCardsByIndex(cards),
  };
};
