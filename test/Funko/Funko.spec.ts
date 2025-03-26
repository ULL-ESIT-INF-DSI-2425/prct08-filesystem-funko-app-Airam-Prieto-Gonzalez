import { describe, test, expect } from "vitest";
import { FunkoPop } from "../../src/Funko/Funko";

describe("FunkoPop class", () => {
  test("should create a new FunkoPop object", () => {
    const funko = new FunkoPop(
      1,
      "Mario",
      "Mario the plumber",
      "Pop!",
      "Games",
      "Nintendo",
      1,
      true,
      "Cute",
      10,
    );
    expect(funko).toBeInstanceOf(FunkoPop);
    expect(funko.id).toBe(1);
    expect(funko.name).toBe("Mario");
    expect(funko.description).toBe("Mario the plumber");
    expect(funko.type).toBe("Pop!");
    expect(funko.gender).toBe("Games");
    expect(funko.franchise).toBe("Nintendo");
    expect(funko.sid).toBe(1);
    expect(funko.exclusive).toBe(true);
    expect(funko.qualities).toBe("Cute");
    expect(funko.price).toBe(10);
  });
});
