import { Card } from "../card";

export const POKER_HAND_TYPE_NAME_HIGH_CARD = "HIGH_CARD";
export const POKER_HAND_TYPE_NAME_PAIR = "PAIR";
export const POKER_HAND_TYPE_NAME_TWO_PAIRS = "TWO_PAIRS";
export const POKER_HAND_TYPE_NAME_THREE_OF_KIND = "THREE_OF_KIND";
export const POKER_HAND_TYPE_NAME_STRAIGHT = "STRAIGHT";
export const POKER_HAND_TYPE_NAME_FLUSH = "FLUSH";
export const POKER_HAND_TYPE_NAME_FULL_HOUSE = "FULL_HOUSE";
export const POKER_HAND_TYPE_NAME_FOUR_OF_KIND = "FOUR_OF_KIND";
export const POKER_HAND_TYPE_NAME_STRAIGHT_FLUSH = "STRAIGHT_FLUSH";

export type PokerHandTypeName =
  | typeof POKER_HAND_TYPE_NAME_HIGH_CARD
  | typeof POKER_HAND_TYPE_NAME_PAIR
  | typeof POKER_HAND_TYPE_NAME_TWO_PAIRS
  | typeof POKER_HAND_TYPE_NAME_THREE_OF_KIND
  | typeof POKER_HAND_TYPE_NAME_STRAIGHT
  | typeof POKER_HAND_TYPE_NAME_FLUSH
  | typeof POKER_HAND_TYPE_NAME_FULL_HOUSE
  | typeof POKER_HAND_TYPE_NAME_FOUR_OF_KIND
  | typeof POKER_HAND_TYPE_NAME_STRAIGHT_FLUSH;

type PokerHand = {
  name: PokerHandTypeName;
  higherCard: Card;
  secondHighestCard?: Card;
};

export default PokerHand;
