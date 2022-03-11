import { _validateNumRange, _validateUnsigned } from './error';
import { _NumType } from './index';

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

export const u8 = function (value: number): U8 {
    return new U8(value);
} as U8Constructor;

Object.defineProperties(u8, {
    MIN: {
        value: new U8(MIN),
        writable: false,
    },
    MAX: {
        value: new U8(MAX),
        writable: false,
    },
});
