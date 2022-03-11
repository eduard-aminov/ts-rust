import { _validateNumRange } from './error';
import { _NumType } from './index';
import { _withStaticProperties } from '../utils';

interface I32Constructor {
    new(value: number): I32;

    (value: number): I32;

    readonly MIN: I32;
    readonly MAX: I32;
}

const MIN = -2147483648;
const MAX = 2147483647;

class I32 {
    constructor(
        public value: number
    ) {
        _validateNumRange(_NumType.I32, value, MIN, MAX);
    }
}

export type i32 = I32;

export const i32 = _withStaticProperties(
    (value: number): I32 => new I32(value),
    {
        MIN: new I32(MIN),
        MAX: new I32(MAX),
    }
) as I32Constructor;

