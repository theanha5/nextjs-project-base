export type Maybe<T> = undefined | null | T;
export type MaybeAll<T extends Record<string, unknown>> = { [key in keyof T]: Maybe<T[key]> };
export type ConstructorOf<C> = { new (...args: any[]): C };
