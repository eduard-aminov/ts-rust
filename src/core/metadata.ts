import { Ctor, isPresent } from './utils';
import { ErrImpl, OkImpl, ResultImpl } from './result';
import { NoneImpl, OptionImpl, SomeImpl } from './option';

export function DefineMetadata(metadata: MetadataProps): (ctor: Ctor) => void {
    return function (ctor: Ctor): void {
        ctor.prototype.__metadata__ = metadata;
    };
}

export interface MetadataProps {
    type: MetadataType,
}

export enum MetadataType {
    Some = '__option_some__',
    None = '__option_none__',
    Ok = '__result_ok__',
    Err = '__result_err__',
}

export class Metadata {
    static hasMetadata<T>(value: T): value is T & { __metadata__: MetadataProps } {
        return isPresent((value as any)?.__metadata__);
    }

    static readFrom<T>(from: T): MetadataProps {
        if (this.hasMetadata(from)) {
            return from.__metadata__;
        }
        throw new Error('Cannot read metadata');
    }

    static setMetadata<T extends object>(instance: T, metadata: MetadataProps): void {
        if (this.hasMetadata(instance)) {
            instance.__metadata__ = metadata;
        } else {
            throw new Error('Value has not metadata');
        }
    }

    static compareWithByKey<L, R>(left: L, right: R, key: keyof MetadataProps): boolean {
        return this.readFrom(left)[key] === this.readFrom(right)[key];
    }

    static isOk(value: unknown): value is OkImpl<any> {
        if (this.hasMetadata(value)) {
            return this.readFrom(value).type === MetadataType.Ok;
        }
        return false;
    };

    static isErr(value: unknown): value is ErrImpl<any> {
        if (this.hasMetadata(value)) {
            return this.readFrom(value).type === MetadataType.Err;
        }
        return false;
    };

    static isResult(value: unknown): value is ResultImpl {
        if (this.hasMetadata(value)) {
            return this.isOk(value) || this.isErr(value);
        }
        return false;
    };

    static isSome(value: unknown): value is SomeImpl<any> {
        if (this.hasMetadata(value)) {
            return this.readFrom(value).type === MetadataType.Some;
        }
        return false;
    };

    static isNone(value: unknown): value is NoneImpl {
        if (this.hasMetadata(value)) {
            return this.readFrom(value).type === MetadataType.None;
        }
        return false;
    };

    static isOption(value: unknown): value is OptionImpl {
        if (this.hasMetadata(value)) {
            return this.isSome(value) || this.isNone(value);
        }
        return false;
    };
}
