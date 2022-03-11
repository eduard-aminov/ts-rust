export const _isPresent = <T>(value: T): boolean => {
    return value !== undefined && value !== null;
};

export const _withStaticProperties = <F extends Function, P extends object>(fn: F, properties: P): F => {
    Object.defineProperties(fn,
        Object.keys(properties).reduce((acc, cur) => ({
            ...acc,
            [cur]: {value: properties[cur as keyof P], writable: false}
        }), {})
    );
    return fn;
};
