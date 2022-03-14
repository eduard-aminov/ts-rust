import { Metadata, OptionTypeMetadata } from './metadata';
import { bool } from './primitives';
import { _, isPresent, withStaticProperties } from './utils';
import { match } from './match';

export interface SomeCtor {
    new<T>(value: T): Option<T>;

    <T>(value: T): Option<T>;
}

export interface NoneCtor {
    new(): Option;

    (): Option;
}

export type OptionCtor = SomeCtor | NoneCtor;

export class OptionImpl<T = any> {
    constructor(
        private _value: T,
        private __metadata__: Metadata,
    ) {
    }

    isSome(): bool {
        return match(this)
            .case(Some(_), bool(true))
            .default(bool(false));
    }

    isNone(): bool {
        return this.isSome().not();
    }

    contains(value: T): bool {
        return bool(value === this._value);
    }

    expect(msg: string): T | never {
        return match(this)
            .case(Some(_), x => x)
            .case(None(), () => { throw new Error(msg); })
            .default();
    }

    unwrap(): T {
        return match(this)
            .case(Some(_), x => x)
            .case(None(), () => { throw new Error('called `Option.unwrap()` on a `None` value'); })
            .default();
    }

    unwrapOr(defaultValue: T): T {
        return match(this)
            .case(Some(_), x => x)
            .default(defaultValue);
    }

    unwrapOrElse(fn: () => T): T {
        return match(this)
            .case(Some(_), x => x)
            .default(fn());
    }

    inspect(fn: (arg: T) => void): this {
        if (this.isSome().value) {
            fn(this._value);
        }
        return this;
    }

    map<U>(fn: (arg: T) => U): Option<U> {
        return match(this)
            .case(Some(_), x => Some(fn(x)))
            .default(None());
    }

    mapOr<U>(defaultValue: U, fn: (arg: T) => U): U {
        return match(this)
            .case(Some(_), x => fn(x))
            .default(defaultValue);
    }

    mapOrElse<U>(defaultFn: () => U, fn: (arg: T) => U): U {
        return match(this)
            .case(Some(_), x => fn(x))
            .default(defaultFn());
    }

    and(optb: Option<T>): Option<T> {
        return match(this)
            .case(Some(_), optb)
            .default(None());
    }

    andThen(fn: (arg: T) => Option<T>): Option<T> {
        return match(this)
            .case(Some(_), x => fn(x))
            .default(None());
    }

    or(optb: Option<T>): Option<T> {
        return match(this)
            .case(Some(_), x => Some(x))
            .default(optb);
    }

    orElse(fn: () => Option<T>): Option<T> {
        return match(this)
            .case(Some(_), x => Some(x))
            .default(fn());
    }

    // xor(optb: Option<T>): Option<T> {
    //     return match([this, optb])
    //         .case([Some(_), None()], (([a]) => Some(a.unwrap())))
    //         .case([None(), Some(_)], (([_, b]) => Some(b.unwrap())))
    //         .default(None());
    // }
    //

    filter(predicate: (arg: T) => boolean): Option<T> {
        if (this.isNone().value) {
            return None();
        }
        if (predicate(this._value)) {
            return Some(this._value);
        }
        return None();
    }

    insert(value: T): T {
        if (isPresent(value)) {
            this._value = value;
            this.__metadata__ = {
                type: OptionTypeMetadata.Some,
            };
        }
        return this._value;
    }

    getOrInsert(value: T): T {
        if (isPresent(value) && this.isNone().value) {
            this._value = value;
            this.__metadata__ = {
                type: OptionTypeMetadata.Some,
            };
        }
        return this._value;
    }

    getOrInsertWith(fn: () => T): T {
        if (this.isNone().value) {
            this._value = fn();
            this.__metadata__ = {
                type: OptionTypeMetadata.Some,
            };
        }
        return this._value;
    }

    take(): Option<T> {
        if (this.isSome().value) {
            const option = Some(this._value);
            this._value = null as any;
            this.__metadata__ = {
                type: OptionTypeMetadata.None,
            };
            return option;
        }
        return this;
    }

    replace(value: T): Option<T> {
        if (isPresent(value)) {
            const oldValue = this._value;
            this._value = value;
            this.__metadata__ = {
                type: OptionTypeMetadata.Some,
            };
            if (isPresent(oldValue)) {
                return Some(oldValue);
            }
        }
        return None();
    }

    zip<U>(other: Option<U>): Option<[T, U]> {
        if (this.isSome().bitand(other.isSome()).value) {
            return Some([this.unwrap(), other.unwrap()]);
        }
        return None();
    }

    zipWith<U, R>(other: Option<U>, fn: (arg1: T, arg2: U) => R): Option<R> {
        if (this.isSome().bitand(other.isSome()).value) {
            return Some(fn(this.unwrap(), other.unwrap()));
        }
        return None();
    }
}

export class SomeImpl<T> extends OptionImpl<T> {
    constructor(value: T) {
        super(value, {type: OptionTypeMetadata.Some});
    }
}

export class NoneImpl extends OptionImpl {
    constructor() {
        super(null, {type: OptionTypeMetadata.None});
    }
}

export type Option<T = any> = OptionImpl<T>;

export const Some = withStaticProperties(
    <T>(value: T): Option<T> => new SomeImpl(value),
    {
        __metadata__: {
            type: OptionTypeMetadata.Some,
        }
    }
) as SomeCtor;

export const None = withStaticProperties(
    (): Option => new NoneImpl(),
    {
        __metadata__: {
            type: OptionTypeMetadata.None,
        }
    }
) as NoneCtor;
