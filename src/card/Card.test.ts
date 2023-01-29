import { parseCard, stringifyCard } from "./Card.helpers";

describe("stringifyCard", () => {
  it("should return stringified card with Club", () => {
    expect(stringifyCard({ value: 2, suit: "C" })).toBe("2C");
  });

  it("should return stringified card with Diamond", () => {
    expect(stringifyCard({ value: 3, suit: "D" })).toBe("3D");
  });

  it("should return stringified card with Heart", () => {
    expect(stringifyCard({ value: 9, suit: "H" })).toBe("9H");
  });

  it("should return stringified card with Spade", () => {
    expect(stringifyCard({ value: 7, suit: "S" })).toBe("7S");
  });

  it("should return stringified card with Valet", () => {
    expect(stringifyCard({ value: "J", suit: "S" })).toBe("JS");
  });

  it("should return stringified card with Queen", () => {
    expect(stringifyCard({ value: "Q", suit: "S" })).toBe("QS");
  });

  it("should return stringified card with King", () => {
    expect(stringifyCard({ value: "K", suit: "S" })).toBe("KS");
  });

  it("should return stringified card with Ace", () => {
    expect(stringifyCard({ value: "A", suit: "S" })).toBe("AS");
  });
});

describe("parseCard", () => {
  it("should return parsed card with Club", () => {
    expect(parseCard("2C")).toStrictEqual({ value: 2, suit: "C" });
  });

  it("should return stringified card with Diamond", () => {
    expect(parseCard("3D")).toStrictEqual({
      value: 3,
      suit: "D",
    });
  });

  it("should return stringified card with Heart", () => {
    expect(parseCard("9H")).toStrictEqual({ value: 9, suit: "H" });
  });

  it("should return stringified card with Spade", () => {
    expect(parseCard("7S")).toStrictEqual({
      value: 7,
      suit: "S",
    });
  });

  it("should return stringified card with Valet", () => {
    expect(parseCard("JS")).toStrictEqual({
      value: "J",
      suit: "S",
    });
  });

  it("should return stringified card with Queen", () => {
    expect(parseCard("QS")).toStrictEqual({
      value: "Q",
      suit: "S",
    });
  });

  it("should return stringified card with King", () => {
    expect(parseCard("KS")).toStrictEqual({ value: "K", suit: "S" });
  });

  it("should return stringified card with Ace", () => {
    expect(parseCard("AS")).toStrictEqual({ value: "A", suit: "S" });
  });

  it("should throw error when invalid input", () => {
    expect(() => parseCard("")).toThrow();
    expect(() => parseCard("S")).toThrow();
    // invalid value
    expect(() => parseCard("1S")).toThrow();
    expect(() => parseCard("0S")).toThrow();
    expect(() => parseCard("BS")).toThrow();
    expect(() => parseCard("ZS")).toThrow();
    // invalid suit
    expect(() => parseCard("3B")).toThrow();
    expect(() => parseCard("AY")).toThrow();
  });
});
