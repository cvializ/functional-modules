import { apply, of } from "./atom";
import { expectT, toBeT } from "./expect";
import { carT, cdrT, chainT, joinT, lastT, terminatePartialT } from "./stack";
import { tuple, tupleT } from "./tuple";

describe('carT and cdr', () => {
    test('it should work for tuples', () => {
        apply(toBeT(1), apply(expectT, apply(carT, apply(apply(of(tuple), of(2)), of(1)))))()
        apply(toBeT(2), apply(expectT, apply(cdrT, apply(apply(of(tuple), of(2)), of(1)))))()

        apply(toBeT(1), apply(expectT, apply(carT, of(tuple(2)(1)))))()
        apply(toBeT(2), apply(expectT, apply(cdrT, of(tuple(2)(1)))))()
    })

    test('it should work for stacks', () => {
        const stackT = of(
            tuple(tuple(tuple(null)(1))(2))(3))

        apply(toBeT(3), apply(expectT, apply(carT, stackT)))()
        apply(toBeT(2), apply(expectT, apply(carT, apply(cdrT, stackT))))()
        apply(toBeT(1), apply(expectT, apply(carT, apply(cdrT, apply(cdrT, stackT)))))()
        apply(toBeT(null), apply(expectT, apply(cdrT, apply(cdrT, apply(cdrT, stackT)))))()
    })

    test('join combines 2 partial tuples into a tuple', () => {
        const firstT = apply(tupleT, of(1))
        const secondT = apply(tupleT, of(2))

        const joinedT = apply(apply(joinT, firstT), secondT)

        apply(toBeT(1), apply(expectT, apply(carT, joinedT)))()
        apply(toBeT(2), apply(expectT, apply(cdrT, joinedT)))()
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

        apply(toBeT(3), apply(expectT, apply(carT, apply(cdrT, stackT))))()
        apply(toBeT(2), apply(expectT, apply(carT, apply(cdrT, apply(cdrT, stackT)))))()
        apply(toBeT(1), apply(expectT, apply(carT, apply(cdrT, apply(cdrT, apply(cdrT, stackT))))))()
        apply(toBeT(null), apply(expectT, apply(cdrT, apply(cdrT, apply(cdrT, apply(cdrT, stackT))))))()

        apply(toBeT(1), apply(expectT, apply(lastT, stackT)))()
    })
})

describe('stack last', () => {
    test('takes the last item of a three element stack', () => {
        const stackT = of(
            tuple(tuple(tuple(null)(1))(2))(3))

        apply(toBeT(3), apply(expectT, apply(carT, stackT)))()
        apply(toBeT(2), apply(expectT, apply(carT, apply(cdrT, stackT))))()
        apply(toBeT(1), apply(expectT, apply(carT, apply(cdrT, apply(cdrT, stackT)))))()
        apply(toBeT(null), apply(expectT, apply(cdrT, apply(cdrT, apply(cdrT, stackT)))))()

        apply(toBeT(1), apply(expectT, apply(lastT, stackT)))()
    })

    test('takes the last item of a three element stack made applicatively', () => {
        const firstT = apply(tupleT, of(null))
        const secondT = apply(tupleT, of(1))
        const thirdT = apply(tupleT, of(2))
        const fourthT = apply(tupleT, of(3))

        const chainedPartial = apply(apply(chainT, firstT), secondT)
        const chainedPartial2T = apply(apply(chainT, chainedPartial), thirdT)
        const chainedPartial3T = apply(apply(chainT, chainedPartial2T), fourthT)

        const stackT = apply(terminatePartialT, chainedPartial3T)

        apply(toBeT(3), apply(expectT, apply(carT, apply(cdrT, stackT))))()
        apply(toBeT(2), apply(expectT, apply(carT, apply(cdrT, apply(cdrT, stackT)))))()
        apply(toBeT(1), apply(expectT, apply(carT, apply(cdrT, apply(cdrT, apply(cdrT, stackT))))))()
        apply(toBeT(null), apply(expectT, apply(cdrT, apply(cdrT, apply(cdrT, apply(cdrT, stackT))))))()

        apply(toBeT(1), apply(expectT, apply(lastT, stackT)))()
    })
})
