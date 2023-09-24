
const T = (a) => () => a;

export const of = (a) => T(a);

export const map = (fn, aT) => fn(aT);

export const apply = (fnT, aT) => () => fnT()(aT);

export const id = aT => aT;

export const idT = of(aT => aT());

export const iterateT = predicate => aT => predicate(aT());

// const actualIterateT = predicate => of(aT => { return predicate(aT); });

export const logT = of(iterateT(aT => { console.log(aT); return aT; }));

// export const filterT = of(conditionFn => iterateT(aT => conditionFn(aT)() ? aT : of(null)));
// export const filterT = conditionFn => of(iterateT(aT => conditionFn(aT) ? aT : of(null)));
export const filterT = conditionFn => of(valueT => predicate(valueT()) ? valueT() : null);

// apply(logT, apply(filterT(x => x === 2), apply(idT, of(2))))()
