export * from './cmp';
export * from './default';
export * from './match';
export * from './metadata';
export * from './option';
export * from './result';
export * from './utils';
export * from './iter';
export * from './num';
export * from './ops';
export * from './primitives';
export * from './str';

export interface Unwrapped<T> {
    unwrap(): T;
}
