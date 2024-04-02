// tests/script.test.js
import add from "../src/script.js"; // CommonJS import

test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3);
});
