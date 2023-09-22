// function call tree


// b and c are trees
// function tree(a, b) {
//     return b(a());
// }

// tree(tree(() => 1, (a) => 2), () => 3)


// concat(a, b) = read => read(a, b);

// concat(1, null)(console.log)


// const read = (now, next) => (value) => { now(value); return next; };
