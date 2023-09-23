import { apply, logT, of } from "./atom.js";
import { consPartialT, endPartialT, logTupleT, tuple } from "./tuple.js";

export const cdrT = of(tupleT => tupleT()(aT => bT => aT))

export const carT = of(tupleT => tupleT()(aT => bT => bT()))

// apply(logTupleT, apply(consPartialT(T(1)), T(tuple(T(3))(T(4)))));
// apply(logTupleT, apply(consPartialT(T(1)), tuple(T(3))));
const stackT = apply(endPartialT(of(3)), apply(consPartialT(of(2)), apply(consPartialT(of(1)), of(tuple(of(null))))));

// const lastT = of(listT => !apply(cdrT, listT)() ? apply(carT, listT)() : apply(lastT, apply(cdrT, listT)()));
const lastT = of(listT => {
    // console.log('cdr', apply(cdrT, listT)());
    // console.log('car', apply(carT, listT)());
    return !apply(cdrT, apply(cdrT, listT))() ? apply(carT, listT)() : apply(lastT, apply(cdrT, listT))();
    // return !apply(cdrT, listT)() ? apply(carT, listT)() : apply(lastT, apply(cdrT, listT))();
});

const shortStackT = apply(endPartialT(of(2)), apply(consPartialT(of(1)), of(tuple(of(null)))));
console.log(apply(cdrT, apply(cdrT, apply(cdrT, shortStackT)))());

console.log('2.0');

apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(logTupleT, stackT))))))()

console.log('3.0');

apply(logT, apply(lastT, stackT))();

// apply(logT, apply(carT, apply(cdrT, apply(cdrT, listT))))();
// apply(logT, apply(lastT, listT))()


// apply(logTupleT, apply(logTupleT, apply(logTupleT, listT)))();

// const copyListT = of((listT) => apply(endPartialT(apply(carT, listT)), apply(copyListT, apply(cdrT, listT))))

// console.log('7.0')

// apply(logTupleT, apply(copyListT, listT))()


// const concatT = of((listAT, listBT) => apply(iterateT(consPartialT(listAT)), ),
// const concatT = of((listAT, listBT) => apply(iterateT(consPartialT(listAT)), ),
