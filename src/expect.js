import { of } from "./atom";

export const expectT = of(value => expect(value));

export const toBeT = value => of(expectValue => { expectValue.toBe(value); return expectValue; });
