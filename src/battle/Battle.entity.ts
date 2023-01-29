import CardDeck from "../cardDesk/CardDeck.entity";
import PokerHand from "../pokerHand/PokerHand.entity";

export type Player = {
  name: string;
  cardDeck: CardDeck;
};

export type ResultBattle = {
  winner: Player | null;
  pokerHand: PokerHand;
};
