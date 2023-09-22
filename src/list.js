import { apply, logT, of } from "./atom.js";
import { consPartialT, endPartialT, tuple } from "./tuple.js";

export const cdrT = of(tupleT => tupleT()(aT => bT => aT))

export const carT = of(tupleT => tupleT()(aT => bT => bT()))


// apply(logTupleT, apply(consPartialT(T(1)), T(tuple(T(3))(T(4)))));
// apply(logTupleT, apply(consPartialT(T(1)), tuple(T(3))));
const listT = apply(endPartialT(of(1)), apply(consPartialT(of(2)), apply(consPartialT(of(3)), of(tuple(of(4))))))

const lastT = of(listT => apply(cdrT, listT)().length === 0 ? apply(cdrT, listT)() : apply(lastT, apply(cdrT, listT)()));

// apply(logT, apply(carT, apply(cdrT, apply(cdrT, listT))))();
apply(logT, apply(lastT, listT))()



// apply(logTupleT, apply(logTupleT, apply(logTupleT, listT)))();

// const copyListT = of((listT) => apply(endPartialT(apply(carT, listT)), apply(copyListT, apply(cdrT, listT))))

// console.log('7.0')

// apply(logTupleT, apply(copyListT, listT))()


// const concatT = of((listAT, listBT) => apply(iterateT(consPartialT(listAT)), ),
// const concatT = of((listAT, listBT) => apply(iterateT(consPartialT(listAT)), ),
