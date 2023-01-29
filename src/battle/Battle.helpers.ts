import { mappingCardValueByIndex } from "../cardDesk/CardDeck.helpers";
import PokerHand, {
  PokerHandTypeName,
  POKER_HAND_TYPE_NAME_FLUSH,
  POKER_HAND_TYPE_NAME_FOUR_OF_KIND,
  POKER_HAND_TYPE_NAME_FULL_HOUSE,
  POKER_HAND_TYPE_NAME_HIGH_CARD,
  POKER_HAND_TYPE_NAME_PAIR,
  POKER_HAND_TYPE_NAME_STRAIGHT,
  POKER_HAND_TYPE_NAME_STRAIGHT_FLUSH,
  POKER_HAND_TYPE_NAME_THREE_OF_KIND,
  POKER_HAND_TYPE_NAME_TWO_PAIRS,
} from "../pokerHand/PokerHand.entity";
import { getBetterPokerHand } from "../pokerHand/PokerHand.helpers";
import { pipeUntilResults } from "../utils";
import { Player, ResultBattle } from "./Battle.entity";

const mappingPokerHandScore: { [key in PokerHandTypeName]: number } = {
  [POKER_HAND_TYPE_NAME_HIGH_CARD]: 1,
  [POKER_HAND_TYPE_NAME_PAIR]: 2,
  [POKER_HAND_TYPE_NAME_TWO_PAIRS]: 3,
  [POKER_HAND_TYPE_NAME_THREE_OF_KIND]: 4,
  [POKER_HAND_TYPE_NAME_STRAIGHT]: 5,
  [POKER_HAND_TYPE_NAME_FLUSH]: 6,
  [POKER_HAND_TYPE_NAME_FULL_HOUSE]: 7,
  [POKER_HAND_TYPE_NAME_FOUR_OF_KIND]: 8,
  [POKER_HAND_TYPE_NAME_STRAIGHT_FLUSH]: 9,
};

const FIRST_PLAYER_WON = "FIRST_PLAYER_WON";
const SECOND_PLAYER_WON = "SECOND_PLAYER_WON";

export const getWinnerFromScore = (
  firstPlayerScore: number,
  secondPlayerScore: number
) => {
  if (firstPlayerScore > secondPlayerScore) {
    return FIRST_PLAYER_WON;
  }

  if (firstPlayerScore < secondPlayerScore) {
    return SECOND_PLAYER_WON;
  }

  return null;
};

const buildResultBattle = (
  player: Player | null,
  pokerHand: PokerHand
): ResultBattle => {
  return {
    winner: player,
    pokerHand,
  };
};

type CheckResultFunctionArgs = {
  firstPlayerPokerHand: PokerHand;
  secondPlayerPokerHand: PokerHand;
};
type CheckResultFunctionResult =
  | "FIRST_PLAYER_WON"
  | "SECOND_PLAYER_WON"
  | null;
type CheckResultFunction = (
  args: CheckResultFunctionArgs
) => CheckResultFunctionResult;

const checkResultFromPokerHandScore: CheckResultFunction = ({
  firstPlayerPokerHand,
  secondPlayerPokerHand,
}) => {
  const firstPlayerScore = mappingPokerHandScore[firstPlayerPokerHand.name];
  const secondPlayerScore = mappingPokerHandScore[secondPlayerPokerHand.name];

  return getWinnerFromScore(firstPlayerScore, secondPlayerScore);
};

const checkResultFromHighestScore: CheckResultFunction = ({
  firstPlayerPokerHand,
  secondPlayerPokerHand,
}) => {
  const firstPlayerScore =
    mappingCardValueByIndex[firstPlayerPokerHand.higherCard.value];
  const secondPlayerScore =
    mappingCardValueByIndex[secondPlayerPokerHand.higherCard.value];

  return getWinnerFromScore(firstPlayerScore, secondPlayerScore);
};

const checkResultFromSecondHighestScore: CheckResultFunction = ({
  firstPlayerPokerHand,
  secondPlayerPokerHand,
}) => {
  if (
    !firstPlayerPokerHand.secondHighestCard ||
    !secondPlayerPokerHand.secondHighestCard
  ) {
    return null;
  }

  const firstPlayerScore =
    mappingCardValueByIndex[firstPlayerPokerHand.secondHighestCard.value];
  const secondPlayerScore =
    mappingCardValueByIndex[secondPlayerPokerHand.secondHighestCard.value];

  return getWinnerFromScore(firstPlayerScore, secondPlayerScore);
};

const checkWinner = (
  firstPlayerPokerHand: PokerHand,
  secondPlayerPokerHand: PokerHand
) => {
  const result = pipeUntilResults<
    CheckResultFunction,
    CheckResultFunctionArgs,
    CheckResultFunctionResult
  >(
    // check result from poker hand score
    checkResultFromPokerHandScore,
    // that means they have both same poker hand score
    // need to check the highest value of card
    checkResultFromHighestScore,
    // they are both equal
    // but for some poker hand we hand to check the second highest value
    checkResultFromSecondHighestScore
  )({
    firstPlayerPokerHand,
    secondPlayerPokerHand,
  });

  return result ?? null;
};

export const battlePokerHands = (
  firstPlayer: Player,
  secondPlayer: Player
): ResultBattle => {
  const firstPlayerPokerHand = getBetterPokerHand(firstPlayer.cardDeck);
  const secondPlayerPokerHand = getBetterPokerHand(secondPlayer.cardDeck);

  const winner = checkWinner(firstPlayerPokerHand, secondPlayerPokerHand);

  if (winner === FIRST_PLAYER_WON) {
    return buildResultBattle(firstPlayer, firstPlayerPokerHand);
  }

  if (winner === SECOND_PLAYER_WON) {
    return buildResultBattle(secondPlayer, secondPlayerPokerHand);
  }

  // Both players are equals
  return buildResultBattle(null, firstPlayerPokerHand);
};
