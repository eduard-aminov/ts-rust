import { match } from './match';
import { _isPresent } from './utils';

type Some<T> = OptionImpl<T>;

type None<T = unknown> = OptionImpl<T>;

enum OptionType {
    Some,
    None,
}

class OptionImpl<T> {

    private _type = OptionType.None;
    private _value?: T;

    constructor(
        value?: T,
    ) {
        this.value = value;
    }

    isSome(): boolean {
        return match(this.type)
            .case(OptionType.Some, true)
            .default(false);
    }

    isNone(): boolean {
        return !this.isSome();
    }

    contains(value: T): boolean {
        return value === this.value;
    }

    expect(msg: string): T | never {
        return match(this.type)
            .case(OptionType.Some, this.value)
            .default(() => { throw new Error(msg); }) as never;
    }

    unwrap(): T {
        return match(this.type)
            .case(OptionType.Some, this.value)
            .default(() => { throw new Error('called `Option.unwrap()` on a `None` value'); }) as never;
    }

    unwrapOr(defaultValue: T): T {
        return match(this.type)
            .case(OptionType.Some, this.value)
            .default(defaultValue);
    }

    unwrapOrElse(fn: () => T): T {
        return match(this.type)
            .case(OptionType.Some, this.value)
            .default(fn());
    }

    map<U>(fn: (arg: T) => U): Option<U> {
        return match(this.type)
            .case(OptionType.Some, () => Some(fn(this.value)))
            .default(None());
    }

    mapOr<U>(defaultValue: U, fn: (arg: T) => U): U {
        return match(this.type)
            .case(OptionType.Some, () => fn(this.value))
            .default(defaultValue);
    }

    mapOrElse<U>(defaultFn: () => U, fn: (arg: T) => U): U {
        return match(this.type)
            .case(OptionType.Some, () => fn(this.value))
            .default(defaultFn());
    }

    and(optb: Option<T>): Option<T> {
        return match(this.type)
            .case(OptionType.Some, optb)
            .default(None());
    }

    andThen(fn: (arg: T) => Option<T>): Option<T> {
        return match(this.type)
            .case(OptionType.Some, fn(this.value))
            .default(None());
    }

    or(optb: Option<T>): Option<T> {
        return match(this.type)
            .case(OptionType.Some, Some(this.value))
            .default(optb);
    }

    orElse(fn: () => Option<T>): Option<T> {
        return match(this.type)
            .case(OptionType.Some, Some(this.value))
            .default(fn());
    }

    // xor(optb: Option<T>): Option<T> {
    //     return match([this, optb])
    //         .case([Some(1), None()], (([a]) => Some(a.unwrap())))
    //         .case([None, Some], (([a, b]) => Some(b)))
    //         .default(None());
    // }

    filter(predicate: (arg: T) => boolean): Option<T> {
        if (predicate(this.value)) {
            return Some(this.value);
        }
        return None();
    }

    insert(value: T): T {
        this.value = value;
        return this.value;
    }

    getOrInsert(value: T): T {
        if (this.isNone()) {
            this.value = value;
        }
        return this.value;
    }

    getOrInsertWith(fn: () => T): T {
        if (this.isNone()) {
            this.value = fn();
        }
        return this.value;
    }

    take(): Option<T> {
        if (this.isSome()) {
            const option = Some(this.value);
            this.value = undefined;
            return option;
        }
        return this;
    }

    replace(value: T): Option<T> {
        const oldValue = this.value;
        this.value = value;
        if (this.isSome()) {
            return Some(oldValue);
        }
        return None();
    }

    zip<U>(other: Option<U>): Option<[T, U]> {
        if (this.isSome() && other.isSome()) {
            return Some([this.unwrap(), other.unwrap()]);
        }
        return None();
    }

    zipWith<U, R>(other: Option<U>, fn: (arg1: T, arg2: U) => R): Option<R> {
        if (this.isSome() && other.isSome()) {
            return Some(fn(this.unwrap(), other.unwrap()));
        }
        return None();
    }

    private get value(): T {
        return this._value!;
    }

    private set value(value: T | undefined) {
        this._value = value;
        this.resolveAndSetType(value);
    }

    private get type(): OptionType {
        return this._type!;
    }

    private resolveAndSetType(value: T | undefined) {
        this._type = match(_isPresent(value))
            .case(true, OptionType.Some)
            .default(OptionType.None);
    }
}

export type Option<T> = Some<T> | None<T>;

export function Some<T>(value: T): Option<T> {
    return new OptionImpl<T>(value);
}

export function None<T = any>(): Option<T> {
    return new OptionImpl<T>();
}
