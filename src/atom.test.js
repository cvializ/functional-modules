import { alt, apply, filterT, map, of } from "./atom";
import { expectT, toBeT } from "./expect";


describe('filterT', () => {
    test('should allow true values through', () => {
        apply(toBeT(10), apply(expectT, apply(filterT(x => x === 10), of(10))))()
    })

    test('should not allow false values through', () => {
        apply(toBeT(null), apply(expectT, apply(filterT(x => x === 10), of(1))))()
    })
})

describe('apply laws', () => {
    test('composition', () => {
        const a = of(x => x)
        const u = of(x => x)
        const v = of(1)

        apply(toBeT(1), apply(expectT, apply(apply(map(f => g => x => f(g(x)), a), u), v)))()
        apply(toBeT(1), apply(expectT, apply(a, apply(u, v))))()
    })
})

describe('alt', () => {
    test('alts', () => {
        apply(toBeT(1), apply(expectT, alt(of(1), of(0))))
    })
})
