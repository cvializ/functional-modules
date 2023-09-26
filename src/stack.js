import { apply, logT, map, of } from "./atom.js";
import { tuple, tupleT } from "./tuple.js";

export const car = tup => tup(a => b => b)

export const carT = of(car)

export const cdr = tup => tup(a => b => a)

export const cdrT = of(cdr)

export const lastT = of(stack => {
    return !apply(cdrT, of(stack))() ? apply(carT, of(stack))() : apply(lastT, apply(cdrT, of(stack)))();
})

export const terminatePartialT = of(partialTuple => apply(of(partialTuple), of(null))())

export const joinT = of(firstPartial => secondPartial => {
    const firstValue = apply(cdrT, apply(terminatePartialT, of(firstPartial)))
    return apply(of(secondPartial), firstValue)()
});

export const chainT = of(firstPartial => secondPartial => {
    return apply(tupleT, apply(apply(joinT, of(secondPartial)), of(firstPartial)))()
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
