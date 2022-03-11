import { _withStaticProperties } from '../utils';
import { _validateNumRange, _validateUnsigned } from './error';
import { _NumType } from './index';

interface U32 {
    value: number;
}

interface U32Constructor {
    new(value: number): U32;

    (value: number): U32;

    readonly MIN: U32;
    readonly MAX: U32;
}

const MIN = 0;
const MAX = 2147483647;

class U32 {
    constructor(
        public value: number
    ) {
        _validateUnsigned(value);
        _validateNumRange(_NumType.U32, value, MIN, MAX);
    }
}

export type u32 = U32;

export const u32 = _withStaticProperties(
    (value: number): U32 => new U32(value),
    {
        MIN: new U32(MIN),
        MAX: new U32(MAX),
    }
) as U32Constructor;
