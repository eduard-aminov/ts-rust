import { Option, SomeImpl } from './option';
import { _, EmptyPlaceholder, isPresent } from './utils';
import { Result, ResultImpl } from './result';
import { Metadata } from './metadata';

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
        } else if (Metadata.hasMetadata(compareValue) && Metadata.hasMetadata(this.value)) {
            if (Metadata.compareWithByKey(compareValue, this.value, 'type')) {
                if (
                    (Metadata.isOption(compareValue) && Metadata.isOption(this.value)) ||
                    (Metadata.isResult(compareValue) && Metadata.isResult(this.value))
                ) {
                    let cmpInternalValue = readInternalValue(compareValue);

                    while(Metadata.isSome(cmpInternalValue) || Metadata.isResult(cmpInternalValue)) {
                        cmpInternalValue = readInternalValue(cmpInternalValue);
                    }

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
    let matchValue = value;

    if (Metadata.isResult(matchValue)) {
        matchValue = readInternalValue(matchValue) as T;
    }

    if (result instanceof Function) {
        return new Case(matchValue, result(matchValue));
    }
    return new Case(matchValue, result);
}

function readInternalValue(value: any): unknown {
    return value._value;
}

export function match<T>(value: Option<T>): Case<Option<T> | SomeImpl<EmptyPlaceholder> | SomeImpl<ResultImpl<EmptyPlaceholder>>, T>;
export function match<T, E>(value: Result<T, E>): Case<Result<T, E> | ResultImpl<EmptyPlaceholder>, T | E>;
export function match<T>(value: T): Case<T, T>;
export function match<T>(value: any): Case<any> {
    return new Case<any, T>(value);
}
