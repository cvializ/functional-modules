// Implements https://github.com/fantasyland/static-land/blob/master/docs/spec.md#monad

const T = (a) => () => a;

const getTValue = (valueT) => valueT();

// Applicative

/**
 * Applicative<T> {
 *   of: <a>(a) => T<a>
 * }
 */
const of = (a) => T(a);


// Functor

/**
 * Functor<T> {
 *   map: <a, b>(a => b, T<a>) => T<b>
 * }
 */

const map = (predicate, aT) => T(predicate(aT()));

// const test = (f, g) => map(x => f(g(x)), of(1))() === map(f, map(g, of(1)))();
// console.log('identity', map(x => x, of(1))());
// console.log('composition', test(x => x+1, x => x+10));


// Apply

/**
 * Apply<T> {
 *   ap: <a, b>(T<a => b>, T<a>) => T<b>
 * }
 */

const ap = (predicateT, aT) => {
    // console.log('predicateT():', predicateT());
    // console.log('predicateT()(aT()):', predicateT()(aT()));
    const b = predicateT()(aT());
    return T(b);
};

const id = x => x;

const a = of(x => { console.log('a', x); return x + 100});
const u = of(x => { console.log('u', x); return x + 10 });
const v = of(1);


const mapT = map(f => g => x => { console.log('inner f,g,x', `${f}, ${g}, ${x}`); return f(g(x)); }, a);
const ap1 = ap(mapT, u);
const ap2 = ap(ap1, v);
console.log('apply', ap2());

// const apd = ap(ap(map(f => g => x => { console.log('f,g,x', `${f}, ${g}, ${x}`); return f(g(x)); }, a), u), v);
// console.log('apply', apd());

// const leftFn = (a, u, v) => ap(ap(map(f => g => x => f(g(x)), a), u), v);
// const rightFn = (a, u, v) => ap(a, ap(u, v));

// const testApFn = (a, u, v) => {
//     const leftT = leftFn(a, u, v);
//     const rightT = rightFn(a, u, v);

//     console.log('left', leftT()())
//     console.log('right', rightT()());
//     return leftT === rightT;
// };

// const pass = testApFn(of((x) => x + 1), of((x) => x + 10), of((x) => x + 100));

// console.log(pass)

/**
 * Chain<T> {
 *   chain: <a, b>(a => T<b>, T<a>) => T<b>
 * }
 */
const chain = (predicateReturningTValue, aT) => {
    const mapResultT = map(predicateReturningTValue, aT);
    return mapResultT(); // todo: do we need to call or can we return original?
};


// Monad

/**
 *
 * ### Monad
 *
 * Module must support `Applicative` and `Chain` algebras for a same `T`,
 * and obey following laws:
 *
 *   1. Left identity: `M.chain(f, M.of(a)) ≡ f(a)`
 *   1. Right identity: `M.chain(M.of, u) ≡ u`
 *
 * #### Can be derived
 *
 *   1. Functor's map: `A.map = (f, u) => A.chain(x => A.of(f(x)), u)`
 */

// const incrementReturningT = a => of(a + 1);

// const oneT = of(1);

// const twoT = chain(incrementReturningT, oneT);

// console.log(getTValue(twoT));

// const threeT = chain(incrementReturningT, twoT);

// console.log(getTValue(threeT));
