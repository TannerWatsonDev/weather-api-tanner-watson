// import tempCharacterization
const tempCharacterization = require("../src/utils/tempCharacterization");

// test environment for tempCharacterization
describe("tempCharacterization", () => {
  //individual tests for each characterization expected
  it("returnes cold for temps below 50", () => {
    expect(tempCharacterization(30)).toBe("cold");
  });

  it("returnes cold for temps below 50 (edge case)", () => {
    expect(tempCharacterization(49)).toBe("cold");
  });

  it("returns moderate for exactly 50 (edge case)", () => {
    expect(tempCharacterization(50)).toBe("moderate");
  });

  it("returns moderate for temps between 50 and 79", () => {
    expect(tempCharacterization(65)).toBe("moderate");
  });

  it("returns hot for exactly 80 (edge case)", () => {
    expect(tempCharacterization(80)).toBe("hot");
  });

  it("returns hot for temps above 80", () => {
    expect(tempCharacterization(95)).toBe("hot");
  });
});