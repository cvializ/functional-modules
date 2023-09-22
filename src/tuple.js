import { apply, id, of } from "./atom.js";


export const tuple = aT => bT => fn => fn(aT)(bT);


// const fT = T(tupleT => tupleT()((aT) => (bT) => { console.log(aT(), bT()); return bT; }));
const iterateTuple = (predicate) => tupleT => tupleT()((aT) => (bT) => {
    predicate(bT());
    if (aT.length === 0) {
        return tuple(of(null))(aT);
    } else {
        return aT;
    }
});
export const logTupleT = of(iterateTuple(console.log));

console.log('6.0');

const identity = tupleT => tupleT();

const identityT = of(identity);


apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(identityT, apply(identityT, of(tuple(of(3))(of(4))))))))();

console.log('6.3')

export const consPartialT = aT => of(partialTupleT => tuple(partialTupleT()(aT)))

export const endPartialT = aT => of(partialTupleT => partialTupleT()(aT))

const listT = apply(endPartialT(of(1)), apply(consPartialT(of(2)), apply(consPartialT(of(3)), of(tuple(of(4))))))


export const mapPartialT = (predicate) => of(partialTupleT => predicate(partialTupleT()));

const list2T = apply(mapPartialT(partial => partial(of(1))), apply(mapPartialT(partial => tuple(partial(of(2)))), apply(mapPartialT(partial => tuple(partial(of(3)))), of(tuple(of(4))))))

apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(identityT, apply(identityT, listT))))))();
apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(identityT, apply(identityT, list2T))))))();
