import { _withStaticProperties } from '../utils';
import { _validateNumRange, _validateUnsigned } from './error';
import { _NumType } from './index';

interface U16 {
    value: number;
}

interface U16Constructor {
    new(value: number): U16;

    (value: number): U16;

    readonly MIN: U16;
    readonly MAX: U16;
}

const MIN = 0;
const MAX = 32767;

class U16 {
    constructor(
        public value: number
    ) {
        _validateUnsigned(value);
        _validateNumRange(_NumType.U16, value, MIN, MAX);
    }
}

export const u16 = _withStaticProperties(
    (value: number): U16 => new U16(value),
    {
        MIN: new U16(MIN),
        MAX: new U16(MAX),
    }
) as U16Constructor;
