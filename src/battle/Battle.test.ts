import { getWinnerFromScore } from "./Battle.helpers";

describe("Battle helpers", () => {
  describe("getWinnerFromScore", () => {
    it("should return FIRST_PLAYER_WON", () => {
      expect(getWinnerFromScore(10, 5)).toBe("FIRST_PLAYER_WON");
    });
    it("should return SECOND_PLAYER_WON", () => {
      expect(getWinnerFromScore(5, 10)).toBe("SECOND_PLAYER_WON");
    });
    it("should return null", () => {
      expect(getWinnerFromScore(5, 5)).toBeNull();
    });
  });
});
