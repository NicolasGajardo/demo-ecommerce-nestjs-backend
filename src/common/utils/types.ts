export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type PartialExcept<T, K extends keyof T> = RecursivePartial<T> &
  Pick<T, K>;

export type AssingTypeToReturnType<T, O> = {
  [K in keyof T]: O;
};

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type XOR<T, U> = T extends object
  ? U extends object
    ? (Without<T, U> & U) | (Without<U, T> & T)
    : U
  : T;

export type AddPrefix<T, P extends string = '_'> = {
  [K in keyof T as `${P}${Capitalize<string & K>}`]: () => T[K];
};

export type AddSufix<T, S extends string = '$'> = {
  [K in keyof T as `${string & K}${S}`]: () => T[K];
};

export type Filter<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

export type Omit<T, O extends keyof T> = {
  [K in keyof T as K extends O ? never : K]: T[K];
};
