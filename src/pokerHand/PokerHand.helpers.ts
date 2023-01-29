import CardDeck, { CardDeskProperties } from "../cardDesk/CardDeck.entity";
import {
  buildCardDeckProperties,
  getHigherCard,
  sortCardsByIndex,
} from "../cardDesk/CardDeck.helpers";
import { pipeUntilResults } from "../utils";
import PokerHand, {
  POKER_HAND_TYPE_NAME_FLUSH,
  POKER_HAND_TYPE_NAME_FOUR_OF_KIND,
  POKER_HAND_TYPE_NAME_FULL_HOUSE,
  POKER_HAND_TYPE_NAME_HIGH_CARD,
  POKER_HAND_TYPE_NAME_PAIR,
  POKER_HAND_TYPE_NAME_STRAIGHT,
  POKER_HAND_TYPE_NAME_STRAIGHT_FLUSH,
  POKER_HAND_TYPE_NAME_THREE_OF_KIND,
  POKER_HAND_TYPE_NAME_TWO_PAIRS,
} from "./PokerHand.entity";

type ChoosePokerHandFunction = (
  cardDeskProperties: CardDeskProperties
) => PokerHand | null;

export const straightFullPokerHand: ChoosePokerHandFunction = (
  cardDeskProperties
) => {
  if (cardDeskProperties.isStraight && cardDeskProperties.isFlush) {
    return {
      name: POKER_HAND_TYPE_NAME_STRAIGHT_FLUSH,
      higherCard: cardDeskProperties.highestCardOnCardDesk,
    };
  }

  return null;
};
export const isFourOfAKindPokerHand: ChoosePokerHandFunction = (
  cardDeskProperties
) => {
  if (cardDeskProperties.duplicatedValueCards.fours.length === 1) {
    return {
      name: POKER_HAND_TYPE_NAME_FOUR_OF_KIND,
      higherCard: cardDeskProperties.duplicatedValueCards.fours[0][0],
    };
  }

  return null;
};
export const isFullHousePokerHand: ChoosePokerHandFunction = (
  cardDeskProperties
) => {
  const { duplicatedValueCards } = cardDeskProperties;
  if (
    duplicatedValueCards.threes.length === 1 &&
    duplicatedValueCards.pairs.length === 1
  ) {
    return {
      name: POKER_HAND_TYPE_NAME_FULL_HOUSE,
      higherCard: duplicatedValueCards.threes[0][0],
    };
  }

  return null;
};
export const isFlushPokerHand: ChoosePokerHandFunction = (
  cardDeskProperties
) => {
  if (cardDeskProperties.isFlush) {
    return {
      name: POKER_HAND_TYPE_NAME_FLUSH,
      higherCard: cardDeskProperties.highestCardOnCardDesk,
    };
  }
  return null;
};
export const isStraightPokerHand: ChoosePokerHandFunction = (
  cardDeskProperties
) => {
  if (cardDeskProperties.isStraight) {
    return {
      name: POKER_HAND_TYPE_NAME_STRAIGHT,
      higherCard: cardDeskProperties.highestCardOnCardDesk,
    };
  }
  return null;
};
export const isThreeOfAKindPokerHand: ChoosePokerHandFunction = (
  cardDeskProperties
) => {
  const { duplicatedValueCards } = cardDeskProperties;
  if (duplicatedValueCards.threes.length === 1) {
    return {
      name: POKER_HAND_TYPE_NAME_THREE_OF_KIND,
      higherCard: getHigherCard(duplicatedValueCards.threes[0]),
    };
  }

  return null;
};
export const isTwoPairsPokerHand: ChoosePokerHandFunction = (
  cardDeskProperties
) => {
  const { duplicatedValueCards } = cardDeskProperties;
  if (duplicatedValueCards.pairs.length === 2) {
    const cardOfFirstPair = duplicatedValueCards.pairs[0][0];
    const cardOfSecondPair = duplicatedValueCards.pairs[1][0];
    const [lowestCardOfPair, highestCardOfPair] = sortCardsByIndex([
      cardOfFirstPair,
      cardOfSecondPair,
    ]);

    return {
      name: POKER_HAND_TYPE_NAME_TWO_PAIRS,
      higherCard: highestCardOfPair,
      secondHighestCard: lowestCardOfPair,
    };
  }

  return null;
};
export const isPairPokerHand: ChoosePokerHandFunction = (
  cardDeskProperties
) => {
  const { duplicatedValueCards } = cardDeskProperties;
  if (duplicatedValueCards.pairs.length === 1) {
    return {
      name: POKER_HAND_TYPE_NAME_PAIR,
      higherCard: getHigherCard(duplicatedValueCards.pairs[0]),
    };
  }

  return null;
};
export const highCardPokerHand = (
  cardDeskProperties: CardDeskProperties
): PokerHand => {
  return {
    name: POKER_HAND_TYPE_NAME_HIGH_CARD,
    higherCard: cardDeskProperties.highestCardOnCardDesk,
  };
};

export const getBetterPokerHand = (cards: CardDeck): PokerHand => {
  const cardDeskProperties = buildCardDeckProperties(cards);

  const pokerHand = pipeUntilResults<
    ChoosePokerHandFunction,
    CardDeskProperties,
    PokerHand
  >(
    straightFullPokerHand,
    isFourOfAKindPokerHand,
    isFullHousePokerHand,
    isFlushPokerHand,
    isStraightPokerHand,
    isThreeOfAKindPokerHand,
    isTwoPairsPokerHand,
    isPairPokerHand,
    highCardPokerHand
  )(cardDeskProperties);

  return pokerHand as PokerHand;
};
