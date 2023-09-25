import { apply, logT, map, of } from "./atom.js";
import { consPartialT, endPartialT, tuple } from "./tuple.js";

export const headT = of(tupleT => tupleT()(aT => bT => bT()))

export const tailT = of(tupleT => tupleT()(aT => bT => aT()))

export const carT = of(tupleT => tupleT()(aT => bT => aT()))

export const cdrT = of(tupleT => tupleT()(aT => bT => bT()))

export const newCarT = of(tupleT => apply(of(aT => bT => bT()), apply(endPartialT(null), tupleT)))

const lastT = of(stackT => {
    return !apply(cdrT, apply(cdrT, stackT))() ? apply(carT, stackT)() : apply(lastT, apply(cdrT, stackT))();
});

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
