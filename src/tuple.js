import { of } from "./atom.js";

// export const tuple = aT => bT => fn => fn(aT)(bT);
export const tuple = aT => bT => fn => fn(aT)(bT);

export const tupleT = of(tuple);

// const fT = T(tupleT => tupleT()((aT) => (bT) => { console.log(aT(), bT()); return bT; }));
const iterateTuple = (predicate) => tupleT => tupleT()((aT) => (bT) => {
    predicate(bT());
    if (aT.length === 0) {
        return tuple(of(null))(aT);
    } else {
        return aT;
    }
});

export const logTupleT = of(iterateTuple(aT => { console.log(aT); return aT; }));

export const consPartialT = aT => of(partialTupleT => tuple(of(partialTupleT()(aT))))

export const consPartialTT = of(aT => of(partialTupleT => tuple(of(partialTupleT()(aT)))))

export const endPartialT = aT => of(partialTupleT => partialTupleT()(aT))

export const mapPartialT = (predicate) => of(partialTupleT => predicate(partialTupleT()));
