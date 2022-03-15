import { _ } from './utils';
import { match } from './match';
import { bool } from './primitives';
import { None, Option, Some } from './option';
import { hasMetadata, Metadata, readMetadata, ResultTypeMetadata } from './metadata';

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

function okFactory<T>(value: T): OkImpl<T> {
    return new OkImpl<T>(value);
}

function errFactory<T>(value: T): ErrImpl<T> {
    return new ErrImpl<T>(value);
}

export const Ok = okFactory as OkCtor;
export const Err = errFactory as ErrCtor;

export const isValueOk = (value: unknown): value is OkImpl<any> => {
    if (hasMetadata(value)) {
        return readMetadata(value).type === ResultTypeMetadata.Ok;
    }
    return false;
};

export const isValueErr = (value: unknown): value is ErrImpl<any> => {
    if (hasMetadata(value)) {
        return readMetadata(value).type === ResultTypeMetadata.Err;
    }
    return false;
};

export const isValueResult = (value: unknown): value is ResultImpl => {
    if (hasMetadata(value)) {
        return isValueOk(value) || isValueErr(value);
    }
    return false;
};
