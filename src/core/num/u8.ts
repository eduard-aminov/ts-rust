import { isPresent } from '../utils';
import { _validateNumRange, _validateUnsigned } from './error';
import { _NumType } from './index';

const MIN = 0;
const MAX = 127;

class StaticU8 {
    readonly MIN = new U8(MIN);
    readonly MAX = new U8(MAX);
}

class U8 {
    constructor(
        public value: number,
    ) {
        _validateUnsigned(value);
        _validateNumRange(_NumType.U8, value, MIN, MAX);
    }
}

export type u8 = U8;

export function u8(): StaticU8;
export function u8(value: number): U8;
export function u8(value?: any): any {
    if (isPresent(value)) {
        return new U8(value!);
    }
    return new StaticU8();
}
