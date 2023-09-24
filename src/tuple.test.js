import { apply, of } from "./atom";
import { carT, cdrT } from "./stack";
import { tuple } from "./tuple";

describe('tuple', () => {
    test('it should work', (done) => {
        const t = tuple(of(1))(of(2));
        t(aT => bT => {
            expect(aT()).toBe(1)
            expect(bT()).toBe(2)
            done()
        })
    })

    test('it should chain 2 tuples together', (done) => {
        const t = tuple(tuple(of(2))(of(null)))(of(1))
        t(aT => bT => {
            expect(bT()).toBe(1)
            aT(cT => dT => {
                expect(cT()).toBe(2)
                expect(dT()).toBe(null)
                done()
            })
        })
    })

    test('it should work with apply', (done) => {
        const t = apply(apply(of(tuple), of(1)), of(2))()
        t(aT => bT => {
            expect(aT()).toBe(1)
            expect(bT()).toBe(2)
            done()
        })
    })

    test('it should chain 2 tuples with apply', (done) => {
        const inner = apply(apply(of(tuple), of(2)), of(3))
        const outer = apply(apply(of(tuple), inner), of(1))()

        outer(aT => bT => {
            expect(bT()).toBe(1)
            aT()(cT => dT => {
                expect(cT()).toBe(2)
                expect(dT()).toBe(3)
                done()
            })
        })
    })

    test('it should chain 3 tuples with apply', (done) => {
        const end = apply(apply(of(tuple), of(3)), of(4))
        const middle = apply(apply(of(tuple), end), of(2))
        const start = apply(apply(of(tuple), middle), of(1))()

        start(aT => bT => {
            expect(bT()).toBe(1)
            aT()(cT => dT => {
                expect(dT()).toBe(2)
                cT()(eT => fT => {
                    expect(eT()).toBe(3)
                    expect(fT()).toBe(4)

                    done()
                })
            })
        })
    })

    // test('it should chain 3 tuples with apply', (done) => {
    //     const end = apply(apply(of(tuple), of(3)), of(null))
    //     const middle = apply(apply(of(tuple), end), of(2))
    //     const start = apply(apply(of(tuple), middle), of(1))


    //     const copyStackT = of(stackT => {
    //         const car = apply(carT, stackT)
    //         const cdr = apply(cdrT, stackT)


    //         const base = apply(apply(of(tuple), of(3)), of(null))
    //         console.log('okkkk', car())
    //         return apply(apply(apply(of(tuple), apply(copyStackT, cdr)), car), of(null))()
    //     })

    //     apply(copyStackT, start)()(aT => bT => {
    //         expect(bT()).toBe(1)
    //         aT()(cT => dT => {
    //             expect(dT()).toBe(2)
    //             cT()(eT => fT => {
    //                 expect(eT()).toBe(3)
    //                 expect(fT()).toBe(null)

    //                 done()
    //             })
    //         })
    //     })
    // })
});
