import { apply, filterT, id, idT, logT, map, of } from "./atom.js";
import { consPartialT, endPartialT, logTupleT, tuple } from "./tuple.js";

export const cdrT = of(tupleT => tupleT()(aT => bT => aT))

export const carT = of(tupleT => tupleT()(aT => bT => bT()))

// apply(logTupleT, apply(consPartialT(T(1)), T(tuple(T(3))(T(4)))));
// apply(logTupleT, apply(consPartialT(T(1)), tuple(T(3))));
const stackT = apply(endPartialT(of(3)), apply(consPartialT(of(2)), apply(consPartialT(of(1)), of(tuple(of(null))))));

// const lastT = of(listT => !apply(cdrT, listT)() ? apply(carT, listT)() : apply(lastT, apply(cdrT, listT)()));
const lastT = of(stackT => {
    // console.log('cdr', apply(cdrT, listT)());
    // console.log('car', apply(carT, listT)());
    return !apply(cdrT, apply(cdrT, stackT))() ? apply(carT, stackT)() : apply(lastT, apply(cdrT, stackT))();
    // return !apply(cdrT, listT)() ? apply(carT, listT)() : apply(lastT, apply(cdrT, listT))();
});

// apply(logT, apply(of('Message'), apply(logT, apply(carT, stackT))))()

// const copyStackT = of(stackT => stackT());

const copyStackT = of(stackT => {
    // apply(logT, of('carT'))()

    // const endWithCarT = apply(endPartialT, apply(carT, stackT))()

    // apply(logT, apply(endWithCarT, apply(consPartialT, apply(cdrT, stackT)))) ()
    // apply(logT, of('cdrT'))()
    // apply(logT, apply(cdrT, stackT))()

    const leftT = apply(carT, stackT)
    const rightT = apply(carT, apply(cdrT, stackT))
    apply(logT, of('left:'))()
    apply(logT, leftT)()
    apply(logT, of('right:'))()
    apply(logT, rightT)()

    // return of(tuple(leftT)(rightT)) //
    // return apply(rightT, apply(of(tuple), leftT))
    apply(copyStackT, apply(cdrT, rightT))()
    // TODO: why can't I join these like this?
    // return apply(of(tuple(leftT)), apply(copyStackT, apply(cdrT, rightT)))

    // return of(rightT(leftT()));

    // return tuple(apply(carT, stackT))(apply(cdrT, stackT));
    return stackT();
    // return apply(of(tuple((apply(carT, stackT)))) , apply(copyStackT, apply(cdrT, stackT)));
});


// // TODO: copy stack
// const copyStackT = of(stackT => {
//     // const endPartialTT = apply(of(endPartialT), apply(carT, stackT))();
//     const endPartialTT = endPartialT(of(10));
//     return apply(endPartialTT, apply(copyStackHelperT, apply(cdrT, stackT)))();
// });

const copyStackHelperT = of(stackT => {
    // const consPartialTT = apply(consPartialT, apply(carT, stackT));
    const consPartialTT = consPartialT(of(20));
    // const consPartialTT = apply(of(consPartialT), apply(carT, stackT))();

    // apply(logT, of('a cdr'))()
    // apply(logT, apply(cdrT, stackT))()
    // apply(logTupleT, apply(apply(filterT, idT), apply(cdrT, stackT)))()

    // apply(logT, of('a car'))()
    // apply(logT, apply(carT, stackT))()

    const isEndT = apply(of(map((cdr) => of(!cdr))), apply(cdrT, stackT))
    // apply(logT, of('isEndT:'))()
    // apply(logT, isEndT)()

    // return !apply(cdrT, stackT)() ? of(tuple(of(null))) : apply(consPartialTT, apply(copyStackHelperT, apply(cdrT, stackT)))();
    return isEndT() ? of(tuple(of(null))) : apply(consPartialTT, apply(copyStackHelperT, apply(cdrT, stackT)))();
});

// apply(logT, of('in the beginning'))()

// const shortStackT = apply(endPartialT(of(2)), apply(consPartialT(of(1)), of(tuple(of(null)))));
// apply(logTupleT, apply(logTupleT, apply(logTupleT, shortStackT)))()

// apply(logT, of('Ok well here we are'))()
// apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(copyStackT, shortStackT))))()




// apply(logT, of('I dont think I care about anything below this'))()

// apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(logTupleT, apply(logTupleT, stackT))))))()

// apply(logT, of('3.0'))()
// apply(logT, apply(lastT, stackT))();

// apply(logT, apply(carT, apply(cdrT, apply(cdrT, listT))))();
// apply(logT, apply(lastT, listT))()


// apply(logTupleT, apply(logTupleT, apply(logTupleT, listT)))();

// const copyListT = of((listT) => apply(endPartialT(apply(carT, listT)), apply(copyListT, apply(cdrT, listT))))

// console.log('7.0')

// apply(logTupleT, apply(copyListT, listT))()


// const concatT = of((listAT, listBT) => apply(iterateT(consPartialT(listAT)), ),
// const concatT = of((listAT, listBT) => apply(iterateT(consPartialT(listAT)), ),
