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
