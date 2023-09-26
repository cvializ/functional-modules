import { apply, logT, map, of } from "./atom.js";
import { consPartialT, endPartialT, tuple, tupleT } from "./tuple.js";

export const headT = of(tup => tup(a => b => b))

export const tailT = of(tup => tup(a => b => a))

export const carT = of(tup => tup(a => b => a))

export const cdrT = of(tup => tup(a => b => b))

export const lastT = of(stack => {
    return !apply(cdrT, of(stack))() ? apply(carT, of(stack))() : apply(lastT, apply(cdrT, of(stack)))();
})

export const lastApT = of(stack => {
    return !apply(tailT, of(stack))() ? apply(headT, of(stack))() : apply(lastApT, apply(tailT, of(stack)))();
});

// export const apLastT = of(stack => {
//     return !apply(tailT, of(stack))() ? apply(headT, of(stack))() : apply(lastT, apply(tailT, of(stack)))();
// });

export const terminatePartialT = of(partialTuple => apply(of(partialTuple), of(null))())

export const joinT = of(leftPartial => rightPartial => {
    const rightValue = apply(carT, apply(terminatePartialT, of(rightPartial)))
    return apply(of(leftPartial), rightValue)()
});

export const chainT = of(leftPartial => rightPartial => {
    return apply(tupleT, apply(apply(joinT, of(leftPartial)), of(rightPartial)))()
});

const copyStackT = of(stackT => {
    const leftT = apply(carT, stackT)
    const rightT = apply(carT, apply(cdrT, stackT))
    apply(logT, of('left:'))()
    apply(logT, leftT)()
    apply(logT, of('right:'))()
    apply(logT, rightT)()


    apply(copyStackT, apply(cdrT, rightT))()

    return stackT();
});

const copyStackHelperT = of(stackT => {
    const isEndT = apply(of(map((cdr) => of(!cdr))), apply(cdrT, stackT))
    return isEndT() ? of(tuple(of(null))) : apply(consPartialTT, apply(copyStackHelperT, apply(cdrT, stackT)))();
});
