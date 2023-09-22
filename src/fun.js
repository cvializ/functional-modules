const id = x => x;

const T = a => (next = id) => next(a);

const idT = (aT) => aT(T)

// test
idT(T(1))() === T(1)()

const getValue = () => {};

// monoid

const call = (left, right) => right(left());

//General case

// const list = call(T(3), call(T(2), call(T(1), (a) => b => c => fn => T(fn(a, b, c)))));

// list((...args) => args.reduce((acc, d) => acc + d))(console.log)


// const map = (fn, aT) => aT(fn);
// map(((...args) => args), list)(console.log);

// const map = (fn, aT) => aT((...args) => args.reduce((left, right) => call(T(fn(left)), right)));
// map(x => x + 1, list)(console.log);


const tuple = first => second => call(T(second), call(T(first), a => b => fn => T(fn(a, b))));

const add = (left, right) => left + right;

const recursiveAdd = (left, right) => left + (typeof right === 'function' ? right(recursiveAdd)() : right);

// const t = tuple(1)(tuple(2)(tuple(3)(4)))

// t(id)(console.log)
// t(recursiveAdd)(console.log)


// const recursiveMapHelper = (predicate, left, right) => {
//     const newLeft = predicate(left);
//     const newRight = typeof right === 'function' ?
//         mapTupleList(predicate, right)() :
//         predicate(right);
//     return tuple(newLeft)(newRight);
// };

// const mapTupleList = (predicate, tupleList) => tupleList((left, right) => recursiveMapHelper(predicate, left, right))

// mapTupleList(x => x, t)(id)(console.log)

// underlying set:

const tuple2 = first => second => fn => fn(first)(second);

const map = (fn, aT) => fn(aT);

map((partialTuple) => partialTuple(3), map((partialTuple) => tuple2(partialTuple(2)), tuple2(1)))((a) => (b) => console.log(a, b));

const apply = (fnT, aT) => fnT()(aT());

apply()

console.log('A', tuple2(1)(2))

tuple2(1)(2)((a) => (b) => console.log(a, b));

const t = tuple2(1)(tuple2(2, 3));

// const apply = (fnT, )

// t((a) => (b) => console.log(a, b))

concat = (t, u) => tuple
