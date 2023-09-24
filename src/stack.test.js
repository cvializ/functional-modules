import { apply, of } from "./atom";
import { expectT, toBeT } from "./expect";
import { carT, cdrT } from "./stack";
import { consPartialT, endPartialT, tuple } from "./tuple";


describe('stack', () => {
    test('creation with raw tuples', () => {

    })

    test('creation with apply', () => {

    })
});

describe('carT and cdr', () => {
    test('it should work', () => {
        apply(toBeT(2), apply(expectT, apply(carT, of(tuple(of(1))(of(2))))))()
        apply(toBeT(1), apply(expectT, apply(cdrT, of(tuple(of(1))(of(2))))))()
    })

    test('it should work for stacks', () => {
        const stackT = of(tuple(of(tuple(of(1))(of(2))))(of(3)));

        apply(toBeT(3), apply(expectT, apply(carT, stackT)))()
        apply(toBeT(2), apply(expectT, apply(carT, apply(cdrT, stackT))))()
        apply(toBeT(1), apply(expectT, apply(cdrT, apply(cdrT, stackT))))()
    })

    test('it should work for stacks partial constructed', () => {
        const stackT = apply(endPartialT(of(3)), apply(consPartialT(of(2)), apply(consPartialT(of(1)), of(tuple(of(null))))));

        apply(toBeT(3), apply(expectT, apply(carT, stackT)))()
        apply(toBeT(2), apply(expectT, apply(carT, apply(cdrT, stackT))))()
        apply(toBeT(1), apply(expectT, apply(carT, apply(cdrT, apply(cdrT, stackT)))))()
        apply(toBeT(null), apply(expectT, apply(cdrT, apply(cdrT, apply(cdrT, stackT)))))()
        // apply(toBeT(2), apply(expectT, apply(cdrT, stackT)))()
        // apply(toBeT(1), apply(expectT, apply(cdrT, apply(cdrT, stackT))))()
    })
})
