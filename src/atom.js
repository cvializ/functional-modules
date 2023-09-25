
const T = (a) => () => a;

export const of = (a) => T(a);

export const map = (fn, aT) => fn(aT);

export const apply = (fnT, aT) => () => fnT()(aT);

export const id = aT => aT;

export const idT = of(aT => aT());

export const iterateT = predicate => aT => predicate(aT());

export const logT = of(iterateT(aT => { console.log(aT); return aT; }));

export const filterT = predicate => of(valueT => predicate(valueT()) ? valueT() : null);
