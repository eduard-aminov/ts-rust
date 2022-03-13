import { isPresent } from './utils';

export interface Metadata {
    type: OptionTypeMetadata | ResultTypeMetadata;
}

export interface WithMetadata {
    readonly __metadata__: Metadata
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
    return (from as any).__metadata__;
};

export const compareMetadataByKey = (left: any, right: any, key: keyof Metadata): boolean => {
    return readMetadata(left)[key] === readMetadata(right)[key];
};
