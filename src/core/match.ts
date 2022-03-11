import { _isPresent } from './utils';

type Fn<T> = (arg: T) => unknown;

class Case<T> {
    constructor(
        private value: T,
        private result: unknown | null = null,
    ) {}

    case<U>(compareValue: T | Fn<T>, result: U | Fn<T>): Case<T> {
        if (_isPresent(this.result)) {
            return this;
        } else if (compareValue === this.value) {
            if (result instanceof Function) {
                return new Case(this.value, result(this.value));
            }
            return new Case(this.value, result);
        }
        return new Case(this.value);
    }

    default<D>(defaultValue: D): any {
        if (_isPresent(this.result)) {
            return this.result;
        }
        if (defaultValue instanceof Function) {
            return defaultValue(this.value);
        }
        return defaultValue;
    }
}

export function match<T>(value: T): Case<T> {
    return new Case(value);
}
