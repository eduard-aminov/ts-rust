import { _, withStaticProperties } from './utils';
import { match } from './match';
import { bool } from './primitives';
import { None, Option, Some } from './option';
import { Metadata, ResultTypeMetadata } from './metadata';

export interface OkCtor {
    new<T>(value: T): Result<T>;

    <T>(value: T): Result<T>;
}

export interface ErrCtor {
    new<T>(value: T): Result<any, T>;

    <T>(value: T): Result<any, T>;
}

export class ResultImpl<T = any, E = any> {
    constructor(
        private _value: T | E,
        private __metadata__: Metadata,
    ) {
    }

    isOk(): bool {
        return match(this)
            .case(Ok(_), bool(true))
            .default(bool(false));
    }

    isErr(): bool {
        return bool(!this.isOk().value);
    }

    ok(): Option<T> {
        return match(this)
            .case(Ok(_), Some(this._value))
            .default(None());
    }

    err(): Option<T> {
        return match(this)
            .case(Err(_), Some(this._value))
            .default(None());
    }

    map<U>(fn: (arg: T | E) => U): Result<U, E> {
        return match(this)
            .case(Ok(_), (x: T) => Ok(fn(x)))
            .case(Err(_), (x: E) => Err(fn(x)))
            .default();
    }
}

export class OkImpl<T> extends ResultImpl<T> {
    constructor(value: T) {
        super(value, {type: ResultTypeMetadata.Ok});
    }
}

export class ErrImpl<E> extends ResultImpl<any, E> {
    constructor(value: E) {
        super(value, {type: ResultTypeMetadata.Err});
    }
}

export type Result<T = any, E = any> = ResultImpl<T, E>;

export const Ok = withStaticProperties(
    <T, E>(value: T): Result<T, E> => new OkImpl<T>(value),
    {
        __metadata__: {
            type: ResultTypeMetadata.Ok,
        }
    }
) as OkCtor;

export const Err = withStaticProperties(
    <T, E>(value: E): Result<T, E> => new ErrImpl<E>(value),
    {
        __metadata__: {
            type: ResultTypeMetadata.Err,
        }
    }
) as ErrCtor;
