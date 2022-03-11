import { _withStaticProperties } from '../utils';
import { _validateNumRange } from './error';
import { _NumType } from './index';

interface I8 {
    value: number;
}

interface I8Constructor {
    new(value: number): I8;

    (value: number): I8;

    readonly MIN: I8;
    readonly MAX: I8;
}

const MIN = -128;
const MAX = 127;

class I8 {
    constructor(
        public value: number
    ) {
        _validateNumRange(_NumType.I8, value, MIN, MAX);
    }
}

export const i8 = _withStaticProperties(
    (value: number): I8 => new I8(value),
    {
        MIN: new I8(MIN),
        MAX: new I8(MAX),
    }
) as I8Constructor;
