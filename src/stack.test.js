import { apply, logT, of } from "./atom";
import { expectT, toBeT } from "./expect";
import { carT, cdrT, headT, tailT } from "./stack";
import { consPartialT, endPartialT, tuple, tupleT } from "./tuple";


describe('stack', () => {
    test('creation with raw tuples', () => {

    })

    test('creation with apply', () => {

    })
});

describe('carT and cdr', () => {
    test('it should work', () => {
        apply(toBeT(1), apply(expectT, apply(carT, of(tuple(of(1))(of(2))))))()
        apply(toBeT(2), apply(expectT, apply(cdrT, of(tuple(of(1))(of(2))))))()
    })

    test('it should work for stacks', () => {
        const stackT = of(tuple(
            of(null))(
            of(tuple(
                of(1))(
                of(tuple(
                    of(2))(
                    of(3)))
                )
            )
        ))

        apply(toBeT(null), apply(expectT, apply(carT, stackT)))()
        apply(toBeT(1), apply(expectT, apply(carT, apply(cdrT, stackT))))()
        apply(toBeT(2), apply(expectT, apply(carT, apply(cdrT, apply(cdrT, stackT)))))()
        apply(toBeT(3), apply(expectT, apply(cdrT, apply(cdrT, apply(cdrT, stackT)))))()
    })

    const terminatePartialT = of(partialTupleT => apply(partialTupleT, of(null))())

    const joinT = of(leftPartialT => rightPartialT => {
        const rightValue = apply(carT, apply(terminatePartialT, rightPartialT))
        return apply(leftPartialT, rightValue)()
    });

    test('combine partial tuples with join into a tuple', () => {
        const partialT = apply(tupleT, of(null))
        const partialT2 = apply(tupleT, of(1))
        const partialT3 = apply(tupleT, of(2))

        apply(toBeT(1), apply(expectT, apply(carT, apply(terminatePartialT, partialT2))))()

        const joinedT = apply(partialT2, apply(carT, apply(terminatePartialT, partialT3)))

        apply(toBeT(1), apply(expectT, apply(carT, joinedT)))()
        apply(toBeT(2), apply(expectT, apply(cdrT, joinedT)))()


        const joined2T = apply(apply(joinT, partialT2), partialT3)

        apply(toBeT(1), apply(expectT, apply(carT, joined2T)))()
        apply(toBeT(2), apply(expectT, apply(cdrT, joined2T)))()
    });


    const chainT = of(leftPartialT => rightPartialT => {
        return apply(tupleT, apply(apply(joinT, leftPartialT), rightPartialT))()
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
