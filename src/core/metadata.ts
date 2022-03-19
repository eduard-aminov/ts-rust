import { isPresent } from './utils';

type Ctor<T = any> = new(...args: T[]) => any;

export function Metadata(metadata: Metadata): (ctor: Ctor) => void {
    return function (ctor: Ctor): void {
        ctor.prototype.__metadata__ = metadata;
    };
}

interface Metadata {
    type: OptionTypeMetadata | ResultTypeMetadata;
}

export enum OptionTypeMetadata {
    Some = '__option_some__',
    None = '__option_none__',
}

export enum ResultTypeMetadata {
    Ok = '__result_ok__',
    Err = '__result_err__',
}

export const hasMetadata = <T>(value: T): boolean => {
    return isPresent((value as any)?.__metadata__);
};

export const readMetadata = <T>(from: T): Metadata => {
    if (!hasMetadata(from)) {
        throw new Error('Cannot read metadata');
    }
    return (from as any)?.__metadata__;
};

export const compareMetadataByKey = (left: any, right: any, key: keyof Metadata): boolean => {
    return readMetadata(left)[key] === readMetadata(right)[key];
};

export const setMetadata = <T>(instance: T, metadata: Metadata) => {
    (instance as any).__metadata__ = metadata;
};

