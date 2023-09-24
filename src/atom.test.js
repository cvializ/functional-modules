import { apply, of } from "./atom";
import { expectT, toBeT } from "./expect";


const filterT = predicate => of(valueT => predicate(valueT()) ? valueT() : null);


describe('filterT', () => {
    test('should allow true values through', () => {
        apply(toBeT(10), apply(expectT, apply(filterT(x => x === 10), of(10))))()
    })

    test('should not allow false values through', () => {
        apply(toBeT(null), apply(expectT, apply(filterT(x => x === 10), of(1))))()
    })
})
