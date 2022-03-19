export type Ctor<T = any> = new(...args: T[]) => any;

export const _ = Symbol('__empty_placeholder__');

export type EmptyPlaceholder = typeof _;

export const isPresent = <T>(value: T): boolean => {
    return value !== undefined && value !== null;
};

export const withStaticProperties = <F extends Function, P extends object>(fn: F, properties: P): F => {
    Object.defineProperties(fn,
        Object.keys(properties).reduce((acc, cur) => ({
            ...acc,
            [cur]: {value: properties[cur as keyof P], writable: false}
        }), {})
    );
    return fn;
};

export const hasCtor = <T>(value: T): value is T & { constructor: unknown } => isPresent((value as any)?.constructor);

export const isClass = <T extends { toString: Function }>(fn: T) => /^\s*class/.test(fn.toString());
