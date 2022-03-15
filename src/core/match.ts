import { isValueOption, Option, SomeImpl } from './option';
import { _, EmptyPlaceholder, isPresent } from './utils';
import { compareMetadataByKey, hasMetadata } from './metadata';
import { isValueResult, Result, ResultImpl } from './result';

type Fn<T> = (arg: T) => unknown;

class Case<T, P = any> {
    constructor(
        private value: T,
        private result: unknown | null = null,
    ) {}

    case<U>(compareValue: SomeImpl<EmptyPlaceholder>, result: Fn<P>): Case<T, P>;
    case<U>(compareValue: ResultImpl<EmptyPlaceholder>, result: Fn<P>): Case<T, P>;
    case<U>(compareValue: ResultImpl<U> & T, result: Fn<U>): Case<T, P>;
    case<U>(compareValue: SomeImpl<U> & T, result: Fn<U>): Case<T, P>;
    case<U>(compareValue: T, result: Fn<U & T>): Case<T, P>;
    case<U>(compareValue: T, result: U): Case<T, P>;
    case(compareValue: any, result: any): Case<any> {
        if (isPresent(this.result)) {
            return this;
        } else if (hasMetadata(compareValue) && hasMetadata(this.value)) {
            if (compareMetadataByKey(compareValue, this.value, 'type')) {
                if (
                    (isValueOption(compareValue) && isValueOption(this.value)) ||
                    (isValueResult(compareValue) && isValueResult(this.value))
                ) {
                    const cmpInternalValue = readInternalValue(compareValue);
                    const matchValueInternalValue = readInternalValue(this.value);
                    if (cmpInternalValue === _ || matchValueInternalValue === cmpInternalValue) {
                        return handleResultAndGetCase(matchValueInternalValue, result);
                    }
                }
            }
        } else if (compareValue === this.value) {
            return handleResultAndGetCase(this.value, result);
        }
        return new Case(this.value);
    }

    default<D>(defaultValue?: D): any {
        if (isPresent(this.result)) {
            return this.result;
        }
        return defaultValue;
    }
}

function handleResultAndGetCase<T>(value: T, result: any): Case<T> {
    if (result instanceof Function) {
        return new Case(value, result(value));
    }
    return new Case(value, result);
}

function readInternalValue(value: any): unknown {
    return value._value;
}

export function match<T>(value: Option<T>): Case<Option<T> | SomeImpl<EmptyPlaceholder>, T>;
export function match<T, E>(value: Result<T, E>): Case<Result<T, E> | ResultImpl<EmptyPlaceholder>, T | E>;
export function match<T>(value: T): Case<T, T>;
export function match<T>(value: any): Case<any> {
    return new Case<any, T>(value);
}
