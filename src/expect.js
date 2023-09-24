import { of } from "./atom";

export const expectT = of(valueT => expect(valueT()));

export const toBeT = value => of(expectT => { expectT().toBe(value); return expectT() });
