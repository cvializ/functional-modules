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

// Apply

/**
 * Apply<T> {
 *   ap: <a, b>(T<a => b>, T<a>) => T<b>
 * }
 */

const ap = (predicateT, aT) => {
    const mapResult = map(predicateT(), aT());
    return T(mapResult);
};

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

const incrementReturningT = a => of(a + 1);

const oneT = of(1);

const twoT = chain(incrementReturningT, oneT);

console.log(getTValue(twoT));

const threeT = chain(incrementReturningT, twoT);

console.log(getTValue(threeT));
