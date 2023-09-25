import { apply, filterT, of } from "./atom";
import { expectT, toBeT } from "./expect";


describe('filterT', () => {
    test('should allow true values through', () => {
        apply(toBeT(10), apply(expectT, apply(filterT(x => x === 10), of(10))))()
    })

    test('should not allow false values through', () => {
        apply(toBeT(null), apply(expectT, apply(filterT(x => x === 10), of(1))))()
    })
})
