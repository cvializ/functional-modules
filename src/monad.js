// Implements https://github.com/fantasyland/static-land/blob/master/docs/spec.md#monad

const T = (a) => () => a;

const getTValue = (valueT) => valueT();


const compose = (...fns) => fns.reduce((a, b) => (...args) => a(b(...args)));

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
    const b = predicateT()(aT());
    return T(b);
};

// const a = of(x => { console.log('a', x); return x + 100});
// const u = of(x => { console.log('u', x); return x + 10 });
// const v = of(1);

// const leftFn = (a, u, v) => ap(ap(map(f => g => x => compose(f,g)(x), a), u), v);
// const rightFn = (a, u, v) => ap(a, ap(u, v));

// const testApFn = (a, u, v) => {
//     const leftT = leftFn(a, u, v);
//     const rightT = rightFn(a, u, v);
//     return leftT() === rightT();
// };

// const pass = testApFn(a, u, v);

// console.log(pass);

/**
 * Chain<T> {
 *   chain: <a, b>(a => T<b>, T<a>) => T<b>
 * }
 */
const chain = (predicateReturningTValue, aT) => {
    const mapResultT = map(predicateReturningTValue, aT);
    return mapResultT;
};

const curryChain = predicateReturningTValue => aT => map(predicateReturningTValue, aT);


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

// const f = x => x + 1;
// const a = 10;

// // console.log(chain(f, of(a)) === f(a));

// const u = of(10);

// console.log(chain(of, u) === a);

// const incrementReturningT = a => of(a + 1);

// const oneT = of(1);

// const twoT = chain(incrementReturningT, oneT);

// console.log(getTValue(twoT));

// const threeT = chain(incrementReturningT, twoT);

// console.log(getTValue(threeT));




const prop = p => o => o[p];

const getUsername = account => chain(prop('name'), chain(prop('user'), chain(prop('personal'), of(account))))();

// const getUsername2 = account => map(
//     compose(
//         prop('name'),
//         prop('user'),
//         prop('personal'),
//     ),
//     of(account)
// )

const getUsername2 = account => compose(
    curryChain(prop('personal')),
    curryChain(prop('user')),
    curryChain(prop('name')),
)(of(account))();

// Might be retrieved async!
const user = {
  personal: {
    user: {
      name: 'John Doe'
    }
  }
}

console.log(getUsername2(user));
