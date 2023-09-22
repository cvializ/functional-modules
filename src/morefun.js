// "Library" base types

const T = (a) => () => a;

const of = (a) => T(a);

const id = x => x;


///

const tuple = first => second => fn => fn(first)(second);

const map = (fn, aT) => fn(aT);

map((partialTuple) => partialTuple(3), map((partialTuple) => tuple(partialTuple(2)), tuple(1)))((a) => (b) => console.log(a, b));

const apply = (fnT, aT) => T(fnT()(aT()));

// apply()

console.log('A', tuple(1)(2))

tuple(1)(2)((a) => (b) => console.log(a, b));

const t = tuple(1)(tuple(2, 3));

apply(T((a) => (b) => console.log(a, b)), apply(T(tuple(3)), T(2)))
