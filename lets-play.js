const KataPokerHands = require("./dist/index");
const playPokerHand = KataPokerHands.default;
const stringifyCard = KataPokerHands.stringifyCard;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writePokerHandsStats = (pokerHand) => {
  console.log(`Poker Hand: ${pokerHand.name}`);
  console.log(`High card: ${stringifyCard(pokerHand.higherCard)}`);
  if (pokerHand.secondHighestCard) {
    console.log(
      `Second high card: ${stringifyCard(pokerHand.secondHighestCard)}`
    );
  }
};

rl.question("What id the card desk of first player ? ", function (playerOne) {
  rl.question(
    "What id the card desk of second player ? ",
    function (playerTwo) {
      const resultBattle = playPokerHand(playerOne, playerTwo);

      if (!resultBattle.winner) {
        console.log("You are equals");
        writePokerHandsStats(resultBattle.pokerHand);
        rl.close();
      }

      console.log(`The winner is ${resultBattle.winner.name}`);
      writePokerHandsStats(resultBattle.pokerHand);
      rl.close();
    }
  );
});

rl.on("close", () => process.exit(0));
