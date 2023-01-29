export const CARD_VALUE_TWO = 2;
export const CARD_VALUE_THREE = 3;
export const CARD_VALUE_FOUR = 4;
export const CARD_VALUE_FIVE = 5;
export const CARD_VALUE_SIX = 6;
export const CARD_VALUE_SEVEN = 7;
export const CARD_VALUE_HEIGHT = 8;
export const CARD_VALUE_NINE = 9;
export const CARD_VALUE_TEN = 10;
export const CARD_VALUE_VALET = "J";
export const CARD_VALUE_QUEEN = "Q";
export const CARD_VALUE_KING = "K";
export const CARD_VALUE_ACE = "A";

export type CardValue =
  | typeof CARD_VALUE_TWO
  | typeof CARD_VALUE_THREE
  | typeof CARD_VALUE_FOUR
  | typeof CARD_VALUE_FIVE
  | typeof CARD_VALUE_SIX
  | typeof CARD_VALUE_SEVEN
  | typeof CARD_VALUE_HEIGHT
  | typeof CARD_VALUE_NINE
  | typeof CARD_VALUE_TEN
  | typeof CARD_VALUE_VALET
  | typeof CARD_VALUE_QUEEN
  | typeof CARD_VALUE_KING
  | typeof CARD_VALUE_ACE;

export const CARD_SUIT_CLUB = "C";
export const CARD_SUIT_DIAMOND = "D";
export const CARD_SUIT_HEART = "H";
export const CARD_SUIT_SPADE = "S";

export type CardSuit =
  | typeof CARD_SUIT_CLUB
  | typeof CARD_SUIT_DIAMOND
  | typeof CARD_SUIT_HEART
  | typeof CARD_SUIT_SPADE;

type Card = {
  suit: CardSuit;
  value: CardValue;
};

export default Card;
