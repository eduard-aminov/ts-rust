import { DefineMetadata, Metadata, MetadataType } from './metadata';
import { bool } from './primitives';
import { _, isPresent } from './utils';
import { match } from './match';
import { Err, Ok, Result } from './result';

export class OptionImpl<T = any> {
    constructor(
        protected _value: T,
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

    okOr<E>(err: E): Result<T, E> {
        return match(this)
            .case(Some(_), x => Ok(x))
            .default(Err(err));
    }

    okOrElse<E>(fn: () => E): Result<T, E> {
        return match(this)
            .case(Some(_), x => Ok(x))
            .default(Err(fn()));
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

    filter(predicate: (arg: T) => boolean): Option<any> {
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
            this.value = value;
        }
        return this._value;
    }

    getOrInsert(value: T): T {
        if (isPresent(value) && this.isNone().value) {
            this.value = value;
        }
        return this._value;
    }

    getOrInsertWith(fn: () => T): T {
        if (this.isNone().value) {
            this.value = fn();
        }
        return this._value;
    }

    take(): Option<any> {
        if (this.isSome().value) {
            const option = Some(this._value);
            this.value = null as any;
            return option;
        }
        return this;
    }

    replace(value: T): Option<any> {
        if (isPresent(value)) {
            const oldValue = this._value;
            this.value = value;
            if (isPresent(oldValue)) {
                return Some(oldValue);
            }
        }
        return None();
    }

    zip<U>(other: OptionImpl<U>): OptionImpl<[T, U]> {
        if (this.isSome().bitand(other.isSome()).value) {
            return Some([this.unwrap(), other.unwrap()]);
        }
        return None();
    }

    zipWith<U, R>(other: OptionImpl<U>, fn: (arg1: T, arg2: U) => R): Option<R> {
        if (this.isSome().bitand(other.isSome()).value) {
            return Some(fn(this.unwrap(), other.unwrap()));
        }
        return None();
    }

    private set value(value: T) {
        this._value = value;
        const type = !isPresent(value) ? MetadataType.None : MetadataType.Some;
        Metadata.setMetadata(this, {type});
    }
}

@DefineMetadata({
    type: MetadataType.Some,
})
export class SomeImpl<T> extends OptionImpl<T> {
    constructor(value: T) {
        super(value);
    }
}

@DefineMetadata({
    type: MetadataType.None,
})
export class NoneImpl extends OptionImpl {
    constructor() {
        super(null);
    }
}

export interface SomeCtor {
    new<T>(value: T): OptionImpl<T>;

    <T>(value: T): OptionImpl<T>;
}

export interface NoneCtor {
    new(): OptionImpl;

    (): OptionImpl;
}

export type Option<T> = OptionImpl<T>;

function factory<T>(value: T): OptionImpl<T>;
function factory<T, E>(value?: any): any {
    if (!isPresent(value)) {
        return new NoneImpl();
    } else {
        return new SomeImpl<T>(value);
    }
}

export const Some = factory as SomeCtor;
export const None = factory as NoneCtor;
