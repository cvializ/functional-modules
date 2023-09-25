
const T = (a) => () => a;

export const of = (a) => T(a);

export const map = (fn, aT) => of(fn(aT()));

export const apply = (fnT, aT) => () => fnT()(aT());

export const id = a => a;

export const idT = of(id);

export const iterateT = predicate => a => predicate(a);

export const logT = of(iterateT(a => { console.log(a); return a; }));

export const filterT = predicate => of(value => predicate(value) ? value : null);

// export const alt = (aT, bT) => apply(filterT(x => x), apply(apply(of(tuple), aT), bT))

export const altT = of(alt)

//   map: <a, b>(a => b, T<a>) => T<b>
//    ap: <a, b>(T<a => b>, T<a>) => T<b>
// chain: <a, b>(a => T<b>, T<a>) => T<b>
