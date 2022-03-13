import { hasMetadata, OptionTypeMetadata, readMetadata, ResultTypeMetadata } from './metadata';
import { OptionImpl } from './option';
import { ResultImpl } from './result';

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

export const isValueOption = (value: unknown): value is OptionImpl => {
    if (hasMetadata(value)) {
        const type = readMetadata(value).type;
        return type === OptionTypeMetadata.Some || type === OptionTypeMetadata.None;
    }
    return false;
};

export const isValueResult = (value: unknown): value is ResultImpl => {
    if (hasMetadata(value)) {
        const type = readMetadata(value).type;
        return type === ResultTypeMetadata.Ok || type === ResultTypeMetadata.Err;
    }
    return false;
};
