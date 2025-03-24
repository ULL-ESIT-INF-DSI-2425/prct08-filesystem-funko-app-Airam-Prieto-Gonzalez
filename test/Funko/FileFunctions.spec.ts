import { describe, test, expect } from "vitest";
import { FunkoPop } from "../../src/Funko/Funko";
import * as FO from "../../src/Funko/FileFunctions";

describe("FunkoPop class", () => {
    test("should create a new FunkoPop object", () => {
        const funko = new FunkoPop(1, "Mario", "Mario the plumber", "Pop!", "Games", "Nintendo", 1, true, "Cute", 10);
        expect(FO.writeFunkoPopToFile("test", funko)).toEqual(undefined);

    });
    test("should read a FunkoPop object from file", () => {
        expect(FO.readFunkoPopsFromFile("test")).toEqual(undefined);
    });
    test("should read a FunkoPop object from file", () => {
        const funko2 = new FunkoPop(2, "Luigi", "Mario's brother", "Pop!", "Games", "Nintendo", 1, true, "Cute", 10);
        FO.modifyFunkoPopFromFile('test', 1, funko2)
        expect(FO.readFunkoPopsFromFile("test")).toEqual(undefined);
        });
        test("should delete a FunkoPop object from file", () => {
            FO.deleteFunkoPopFromFile('test', 2)
            expect(FO.readFunkoPopsFromFile("test")).toEqual(undefined);
        }
    );
})
