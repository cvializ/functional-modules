import { apply, logT, of } from "./atom";
import { expectT, toBeT } from "./expect";
import { carT, cdrT, chainT, headT, joinT, tailT, terminatePartialT } from "./stack";
import { tuple, tupleT } from "./tuple";

describe('carT and cdr', () => {
    test('it should work', () => {
        of(tuple(of(1)(of(2))))
        apply(toBeT(1), apply(expectT, apply(carT, apply(apply(of(tuple), of(1)), of(2)))))()
        apply(toBeT(2), apply(expectT, apply(cdrT, apply(apply(of(tuple), of(1)), of(2)))))()

        apply(toBeT(1), apply(expectT, apply(carT, of(tuple(1)(2)))))()
        apply(toBeT(2), apply(expectT, apply(cdrT, of(tuple(1)(2)))))()
    })

    test('it should work for stacks', () => {
        const stackT = of(
            tuple(null)(
                tuple(1)(
                    tuple(
                        2)(
                        3))
                    )
                )

        apply(toBeT(null), apply(expectT, apply(carT, stackT)))()
        apply(toBeT(1), apply(expectT, apply(carT, apply(cdrT, stackT))))()
        apply(toBeT(2), apply(expectT, apply(carT, apply(cdrT, apply(cdrT, stackT)))))()
        apply(toBeT(3), apply(expectT, apply(cdrT, apply(cdrT, apply(cdrT, stackT)))))()
    })

    test('combine partial tuples with join into a tuple', () => {
        const partialT2 = apply(tupleT, of(null))
        const partialT3 = apply(tupleT, of(1))

        const joined2T = apply(apply(joinT, partialT2), partialT3)

        apply(toBeT(null), apply(expectT, apply(carT, joined2T)))()
        apply(toBeT(1), apply(expectT, apply(cdrT, joined2T)))()
    });

    test('combine partial tuples with chain into a new partial tuple', () => {
        const partialT = apply(tupleT, of(null))
        const partial2T = apply(tupleT, of(1))
        const partial3T = apply(tupleT, of(2))

        const chainedPartialT = apply(apply(chainT, partialT), partial2T);
        const chainedPartial2T = apply(apply(chainT, chainedPartialT), partial3T)

        apply(toBeT(2), apply(expectT, apply(headT, apply(tailT, apply(terminatePartialT, chainedPartial2T)))))()
        apply(toBeT(1), apply(expectT, apply(headT, apply(tailT, apply(tailT, apply(terminatePartialT, chainedPartial2T))))))()
        apply(toBeT(null), apply(expectT, apply(tailT, apply(tailT, apply(tailT, apply(terminatePartialT, chainedPartial2T))))))()
    })
})
