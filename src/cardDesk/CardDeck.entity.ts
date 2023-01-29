import Card from "../card/Card.entity";

type CardDeck = [Card, Card, Card, Card, Card];

export type DuplicatedValueCards = {
  pairs: Card[][];
  threes: Card[][];
  fours: Card[][];
};

export type CardDeskProperties = {
  duplicatedValueCards: DuplicatedValueCards;
  isStraight: boolean;
  isFlush: boolean;
  highestCardOnCardDesk: Card;
};

export default CardDeck;
