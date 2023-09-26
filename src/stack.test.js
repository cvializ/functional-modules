import { apply, logT, of } from "./atom";
import { expectT, toBeT } from "./expect";
import { apLastT, carT, cdrT, chainT, headT, joinT, lastApT, lastT, tailT, terminatePartialT } from "./stack";
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
        const firstT = apply(tupleT, of(null))
        const secondT = apply(tupleT, of(1))
        const thirdT = apply(tupleT, of(2))
        const fourthT = apply(tupleT, of(3))

        const chainedPartial = apply(apply(chainT, firstT), secondT)
        const chainedPartial2T = apply(apply(chainT, chainedPartial), thirdT)
        const chainedPartial3T = apply(apply(chainT, chainedPartial2T), fourthT)

        const stackT = apply(terminatePartialT, chainedPartial3T)
        // TODO: use this style everywhere
        // const stackT = of(
        //     tuple(tuple(tuple(tuple(null)(1))(2))(3))(null))

        apply(toBeT(3), apply(expectT, apply(headT, apply(tailT, stackT))))()
        apply(toBeT(2), apply(expectT, apply(headT, apply(tailT, apply(tailT, stackT)))))()
        apply(toBeT(1), apply(expectT, apply(headT, apply(tailT, apply(tailT, apply(tailT, stackT))))))()
        apply(toBeT(null), apply(expectT, apply(tailT, apply(tailT, apply(tailT, apply(tailT, stackT))))))()

        apply(toBeT(1), apply(expectT, apply(lastApT, stackT)))()
    })
})

describe('stack last', () => {
    test('takes the last item of a three element stack', () => {
        const stackT = of(
            tuple(1)(
            tuple(2)(
                tuple(3)(null))
            )
        )

        apply(toBeT(1), apply(expectT, apply(carT, stackT)))()
        apply(toBeT(2), apply(expectT, apply(carT, apply(cdrT, stackT))))()
        apply(toBeT(3), apply(expectT, apply(carT, apply(cdrT, apply(cdrT, stackT)))))()
        apply(toBeT(null), apply(expectT, apply(cdrT, apply(cdrT, apply(cdrT, stackT)))))()

        apply(toBeT(3), apply(expectT, apply(lastT, stackT)))()
    })

    test.skip('takes the last item of a three element stack made applicatively', () => {

        const partialT = apply(tupleT, of(1))
        const partial2T = apply(tupleT, of(2))
        const partial3T = apply(tupleT, of(3))
        const partial4T = apply(tupleT, of(4))

        apply(logT, apply(headT, apply(tailT, apply(terminatePartialT, apply(apply(chainT, partial2T), partialT)))))()

        // const chainedPartialT = apply(apply(chainT, partial2T), partialT)
        // const chainedPartial2T = apply(apply(chainT, chainedPartialT), partial3T)
        // const chainedPartial3T = apply(apply(chainT, chainedPartial2T), partial4T)


        const chainedPartial = apply(apply(chainT, firstT), secondT)
        const chainedPartial2T = apply(apply(chainT, chainedPartial), thirdT)
        const chainedPartial3T = apply(apply(chainT, chainedPartial2T), fourthT)

        const stackT = apply(terminatePartialT, chainedPartial3T)

        apply(toBeT(null), apply(expectT, apply(headT, stackT)))()
        apply(toBeT(4), apply(expectT, apply(headT, apply(tailT, stackT))))()
        apply(toBeT(3), apply(expectT, apply(headT, apply(tailT, apply(tailT, stackT)))))()
        // apply(toBeT(2), apply(expectT, apply(headT, apply(tailT, apply(tailT, apply(tailT, apply(tailT, stackT)))))))()
        // apply(toBeT(null), apply(expectT, apply(cdrT, apply(cdrT, apply(cdrT, stackT)))))()

        // apply(toBeT(4), apply(expectT, apply(lastT, stackT)))()
    })
})
