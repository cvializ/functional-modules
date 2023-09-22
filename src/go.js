const T = (a) => () => a;

const tuple = a => b => fn => fn(a)(b);

const apply = (fnT, aT) => T(fnT()(aT));

// tuple(T(1))(T(2))(aT => bT => console.log('A: ', aT(), bT()));
// const p01 = tuple(T(1))(tuple(T(2)))(T(3));
// const p02 = tuple(T(2));

const logx = aT => bT => { console.log('z', aT, bT()); return aT };

console.log(tuple(T(1)))
tuple(tuple(T(1))(T(2)))(T(3))(logx)(logx)(logx);
console.log(tuple(T(1))(tuple(T(2))))

// p02(T(3))(aT => bT => console.log('A.2: ', aT, bT));


// const p1 = tuple(T(1))(T(tuple(T(2))(T(3))));
// p1(aT => bT => console.log('B: ', aT(), bT()))

// const log = aT => bT => { console.log('c', aT, bT, aT(), bT()); return bT; };

// const a1 = apply(T(tuple(T(0))), T(1));
// a1(log)




x = tuple(tuple(tuple(tuple(T())(T()))(T(1)))(T(2)))(T(3))(logx)(logx)(logx);

// do it the other way

const logT = T(aT => bT => { console.log('r', aT()); return bT; });

y = apply(T(tuple(T())(T())), apply(tuple(T(1)), T(tuple(T(2)))));
