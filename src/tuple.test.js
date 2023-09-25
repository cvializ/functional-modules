import { apply, idT, logT, of } from "./atom";
import { expectT, toBeT } from "./expect";
import { carT, cdrT } from "./stack";
import { tuple } from "./tuple";

describe('tuple', () => {
    test('it should work', (done) => {
        const t = tuple(1)(2);
        t(a => b => {
            expect(a).toBe(1)
            expect(b).toBe(2)
            done()
        })
    })

    test('it should chain 2 tuples together', (done) => {
        const t = tuple(tuple(2)(null))(1)
        t(a => b => {
            expect(b).toBe(1)

            a(c => d => {
                expect(c).toBe(2)
                expect(d).toBe(null)

                done()
            })
        })
    })

    test('apply can apply it', (done) => {
        const t = apply(apply(of(tuple), of(1)), of(2))()
        t(a => b => {
            expect(a).toBe(1)
            expect(b).toBe(2)
            done()
        })
    })

    test('it can accept applied values as elements', (done) => {
        const t = apply(apply(of(tuple), apply(idT, of(1))), of(2))()

        t(a => b => {
            expect(a).toBe(1)
            expect(b).toBe(2)
            done()
        })
    });

    test('it should chain 2 tuples with apply', (done) => {
        const inner = apply(apply(of(tuple), of(2)), of(3))
        const outer = apply(apply(of(tuple), inner), of(1))()

        outer(a => b => {
            expect(b).toBe(1)

            a(c => d => {
                expect(c).toBe(2)
                expect(d).toBe(3)
                done()
            })
        })
    })

    test('it should chain 3 tuples with apply', () => {
        const endT = apply(apply(of(tuple), of(3)), of(4))
        const middleT = apply(apply(of(tuple), of(2)), endT)
        const startT = apply(apply(of(tuple), of(1)), middleT)

        apply(toBeT(1), apply(expectT, apply(carT, startT)))()
        apply(toBeT(2), apply(expectT, apply(carT, apply(cdrT, startT))))()
        apply(toBeT(3), apply(expectT, apply(carT, apply(cdrT, apply(cdrT, startT)))))()
        apply(toBeT(4), apply(expectT, apply(cdrT, apply(cdrT, apply(cdrT, startT)))))()
    })
});
