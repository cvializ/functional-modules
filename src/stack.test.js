import { apply, logT, of } from "./atom";
import { expectT, toBeT } from "./expect";
import { carT, cdrT } from "./stack";
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

    // test('it should work for stacks partial constructed', () => {
    //     const stackT = apply(endPartialT(of(3)), apply(consPartialT(of(2)), apply(consPartialT(of(1)), of(tuple(of(null))))));

    //     apply(toBeT(3), apply(expectT, apply(carT, stackT)))()
    //     apply(toBeT(2), apply(expectT, apply(carT, apply(cdrT, stackT))))()
    //     apply(toBeT(1), apply(expectT, apply(carT, apply(cdrT, apply(cdrT, stackT)))))()
    //     apply(toBeT(null), apply(expectT, apply(cdrT, apply(cdrT, apply(cdrT, stackT)))))()
    //     // apply(toBeT(2), apply(expectT, apply(cdrT, stackT)))()
    //     // apply(toBeT(1), apply(expectT, apply(cdrT, apply(cdrT, stackT))))()
    // })

    const terminatePartialT = of(partialTupleT => apply(partialTupleT, of(null))())

    test('combine partial tuples with apply', () => {
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

        const partialT = apply(tupleT, of(null))
        const partialT2 = apply(tupleT, of(1))
        const partialT3 = apply(tupleT, of(2))

        apply(toBeT(1), apply(expectT, apply(carT, apply(terminatePartialT, partialT2))))()

        const joinedT = apply(partialT2, apply(carT, apply(terminatePartialT, partialT3)))

        apply(toBeT(1), apply(expectT, apply(carT, joinedT)))()
        apply(toBeT(2), apply(expectT, apply(cdrT, joinedT)))()

        const joinT = of(leftPartialT => rightPartialT => {
            const rightValue = apply(carT, apply(terminatePartialT, rightPartialT))
            return apply(leftPartialT, rightValue)()
        });

        const joined2T = apply(apply(joinT, partialT2), partialT3)

        apply(toBeT(1), apply(expectT, apply(carT, joined2T)))()
        apply(toBeT(2), apply(expectT, apply(cdrT, joined2T)))()

        // const joined3T = apply(apply(joinT, apply(tupleT, of(null))), apply(tupleT, of(1)))

        // apply(joinT, apply(apply(joinT, partialT), partialT2), partialT3)

        // const combinedT = apply(tupleT, apply(partialT, partialT2))

        // apply(toBeT(1), apply(expectT, apply(cdrT, apply(terminatePartialT, partialT2))))()

        // apply(toBeT(null), apply(expectT, apply(carT, apply(terminatePartialT, combinedT))))()
        // apply(toBeT(null), apply(expectT, apply(carT, apply(cdrT, apply(terminatePartialT, combinedT)))))()
        // apply(toBeT(1), apply(expectT, apply(cdrT, apply(carT, combinedT))))()


        apply(toBeT(null), apply(expectT, apply(carT, stackT)))()
        apply(toBeT(1), apply(expectT, apply(carT, apply(cdrT, stackT))))()
        apply(toBeT(2), apply(expectT, apply(carT, apply(cdrT, apply(cdrT, stackT)))))()
        apply(toBeT(3), apply(expectT, apply(cdrT, apply(cdrT, apply(cdrT, stackT)))))()

    });
})
