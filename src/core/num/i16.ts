import { _withStaticProperties } from '../utils';
import { _validateNumRange } from './error';
import { _NumType } from './index';

interface I16 {
    value: number;
}

interface I16Constructor {
    new(value: number): I16;

    (value: number): I16;

    readonly MIN: I16;
    readonly MAX: I16;
}

const MIN = -32768;
const MAX = 32767;

class I16 {
    constructor(
        public value: number
    ) {
        _validateNumRange(_NumType.I16, value, MIN, MAX);
    }
}

export const i16 = _withStaticProperties(
    (value: number): I16 => new I16(value),
    {
        MIN: new I16(MIN),
        MAX: new I16(MAX),
    }
) as I16Constructor;

