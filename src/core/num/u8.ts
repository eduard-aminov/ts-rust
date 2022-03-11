import { _validateNumRange, _validateUnsigned } from './error';
import { _NumType } from './index';
import { withStaticProperties } from '../utils';

interface U8 {
    value: number;
}

interface U8Constructor {
    new(value: number): U8;

    (value: number): U8;

    readonly MIN: U8;
    readonly MAX: U8;
}

const MIN = 0;
const MAX = 127;

class U8 {
    constructor(
        public value: number
    ) {
        _validateUnsigned(value);
        _validateNumRange(_NumType.U8, value, MIN, MAX);
    }
}

export const u8 = withStaticProperties(
    (value: number): U8 => new U8(value),
    {
        MIN: new U8(MIN),
        MAX: new U8(MAX),
    }
) as U8Constructor;
