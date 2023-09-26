import { apply, chain, id, logT, map, of } from "./atom";
import { expectT, toBeT } from "./expect";
import { car, carT, cdr, cdrT, chainT, joinT, lastT, terminatePartialT } from "./stack";
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

describe('chain', () => {
    test('works', () => {
        const stack = tuple(tuple(tuple(tuple(null)(1))(2))(3))(4)

        // chain functions need to accept non-wrapped and return a wrapped value
        const ccar = tup => of(car(tup))
        const ccdr = tup => of(cdr(tup))

        apply(toBeT(4), apply(expectT, chain(ccar, of(stack))))()
        apply(toBeT(3), apply(expectT, chain(ccar, chain(ccdr, of(stack)))))()
        apply(toBeT(2), apply(expectT, chain(ccar, chain(ccdr, chain(ccdr, of(stack))))))()
        apply(toBeT(1), apply(expectT, chain(ccar, chain(ccdr, chain(ccdr, chain(ccdr, of(stack)))))))()
        apply(toBeT(null), apply(expectT, chain(ccdr, chain(ccdr, chain(ccdr, chain(ccdr, of(stack)))))))()
    })

    test('map equivalent', () => {
        const prop = k => xs =>
            k in xs ? of(xs[k])
                    : of(null)

        const data = { a: { b: { c: 2 } } }

        // // How do we get to the 2?
        // prop('a')(data) // Just({ b: { c: 2 } })
        //     .map(prop('b')) // Just(Just({ c: 2 }))
        //     .map(map(prop('c'))) // Just(Just(Just(2)))

        apply(toBeT({b: {c: 2}}), apply(expectT, prop('a')(data)))()
        apply(toBeT({c: 2}), apply(expectT, map(prop('b'))(prop('a')(data))()))()
        apply(toBeT(2), apply(expectT, map(map(prop('c')))(map(prop('b'))(prop('a')(data)))()()))()

        // prop('a')(data) // Just({ b: { c: 2 } })
        // .chain(prop('b')) // Just({ c: 2 })
        // .chain(prop('c')) // Just(2)

        apply(toBeT(2), apply(expectT, chain(prop('c'), chain(prop('b'), prop('a')(data)))))()
    })
})
