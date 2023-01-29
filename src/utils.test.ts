import { pipeUntilResults } from "./utils";

describe("pipeUntilResults", () => {
  it("should execute functions until one of them return a non null value", () => {
    const firstFn = jest.fn(() => null);
    const secondFn = jest.fn(() => null);
    const thirdFn = jest.fn(() => "value");
    const fourthFn = jest.fn(() => null);
    const result = pipeUntilResults<any, any, any>(
      firstFn,
      secondFn,
      thirdFn,
      fourthFn
    )("my argument");

    expect(result).toBe("value");
    expect(firstFn).toHaveBeenCalledWith("my argument");
    expect(secondFn).toHaveBeenCalledWith("my argument");
    expect(thirdFn).toHaveBeenCalledWith("my argument");
    expect(fourthFn).not.toHaveBeenCalled();
  });

  it("should execute functions and return null", () => {
    const firstFn = jest.fn(() => null);
    const secondFn = jest.fn(() => null);
    const thirdFn = jest.fn(() => null);
    const fourthFn = jest.fn(() => null);

    const result = pipeUntilResults(
      firstFn,
      secondFn,
      thirdFn,
      fourthFn
    )("my argument");

    expect(result).toBeNull();
    expect(firstFn).toHaveBeenCalledWith("my argument");
    expect(secondFn).toHaveBeenCalledWith("my argument");
    expect(thirdFn).toHaveBeenCalledWith("my argument");
    expect(fourthFn).toHaveBeenCalledWith("my argument");
  });
});
