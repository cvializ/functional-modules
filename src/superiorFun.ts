// "Library" base types

const T = (a) => () => a;

const read = (aT) => aT();

const of = (a) => T(a);

const id = x => x;


const y = (aT) => (bT) => {
    console.log('y', aT(), bT); return bT;
};

///
const functor = f => g => aT => f(g(aT));

const tuple = aT => bT => fn => fn(aT)(bT);

const map = (fn, aT) => fn(aT);

console.log('sad');

const testTuple0 = tuple(T(1))(T(2))
testTuple0((aT) => (bT) => console.log('0   ', aT(), bT()));


const testTuple1 = map((partialTuple) => partialTuple(T(2)), tuple(T(1)));
testTuple1((aT) => (bT) => console.log('1   ', aT(), bT()))


const testTuple2 = tuple(T(1))(tuple(T(2))(T(3)));
testTuple2((aT) => (bT) => console.log('2   ', aT(), bT));


console.log('2.5 ')
const partial25 = tuple(T(1));
partial25(tuple(T(2))(tuple(T(3))(tuple()())))(y)(y)(y);


const testTuple3 = map((partialTuple) => partialTuple(T(tuple()())), map((partialTuple) => tuple(partialTuple(T(3))), map((partialTuple) => tuple(partialTuple(T(2))), tuple(T(1)))));
// testTuple3((aT) => (bT) => console.log('3   ', aT, bT));
// testTuple3(y)(y)(y)

const apply = (fnT, aT) => T(fnT()(aT));

const testTuple4 = apply(T(tuple(T(1))), apply(T(tuple(T(2))), T(3)))();

console.log('4.1')

console.log('4.2 ')
// const fT = T(tupleT => tupleT()((aT) => (bT) => { console.log(aT(), bT()); return bT; }));
const logTuple = tupleT => tupleT()((aT) => (bT) => {
    console.log('z', aT(), (typeof bT === 'function' ? bT() : bT));
    return (typeof bT === 'function' ? bT() : bT);
});
const fT = T(logTuple);
apply(fT, apply(fT, T(testTuple4)));


console.log('5 ')

// const fT = T(tupleT => tupleT()((aT) => (bT) => { console.log(aT(), bT()); return bT; }));
const iterateTuple = (predicate) => tupleT => tupleT()((aT) => (bT) => {
    predicate(bT());
    if (aT.length === 0) {
        return tuple(T(null))(aT);
    } else {
        return aT;
    }
});
const logTupleT = T(iterateTuple(console.log));
apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(logTupleT, T(testTuple3)))))));


console.log('6.0');

const iterateT = predicate => aT => predicate(aT());
const logT = T(iterateT(console.log));


const identity = (tupleT) => tupleT();
const identityT = T(identity);

const carT = T(tupleT => tupleT()(aT => bT => aT()))
const cdrT = T(tupleT => tupleT()(aT => bT => bT()))


apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(identityT, apply(identityT, T(tuple(T(3))(T(4))))))));

console.log('6.3')

const consPartialT = aT => T(partialTupleT => tuple(partialTupleT()(aT)))
const endPartialT = aT => T(partialTupleT => partialTupleT()(aT))

// apply(logTupleT, apply(consPartialT(T(1)), T(tuple(T(3))(T(4)))));
// apply(logTupleT, apply(consPartialT(T(1)), tuple(T(3))));
apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(endPartialT(of(1)), apply(consPartialT(of(2)), of(tuple(of(3)))))))))


/**
 * (1, 2)
 * ((1, 2), 3)
 * (((1, 2), 3), 4)
 */

console.log('7.0')

// const consT = aT => T(tupleT => tuple(tuple(of(null))(apply(carT, tupleT)))(aT));
// const consT = aT => T(tupleT => T(tuple(tuple(apply(cdrT, tupleT))(apply(carT, tupleT)))(aT)));
const consT = aT => T(tupleT => {
    // console.log('consT');
    const bT = apply(carT, tupleT);
    const cT = apply(cdrT, tupleT);

    // apply(logT, aT);
    // apply(logT, bT);
    // apply(logT, cT);

    // console.log('end consT');
    const x = apply(endPartialT(aT), apply(consPartialT(cT), of(tuple(bT))));
    // console.log(x());
    return x;
});

// apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(endPartialT(of(3)), apply(consPartialT(of(2)), of(tuple(of(1))))))))

apply(logTupleT, apply(consT(of(1)), apply(consT(of(1)), of(tuple(of(2))(of(3))))))


// console.log(testTuple6)
// console.log(testTuple6())

// apply(logTupleT, T(testTuple6));



console.log('done');
console.log('done');
console.log('done');
console.log('done');

// // apply()

// console.log('A', tuple(1)(2))

// tuple(T(1))(T(2))((a) => (b) => console.log(a, b));

// const t = tuple(1)(tuple(2, 3));
