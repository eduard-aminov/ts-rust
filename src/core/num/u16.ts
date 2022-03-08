import { isPresent } from '../utils';
import { _validateNumRange, _validateUnsigned } from './error';
import { _NumType } from './index';

const MIN = 0;
const MAX = 32767;

class StaticU16 {
    readonly MIN = new U16(MIN);
    readonly MAX = new U16(MAX);
}

class U16 {
    constructor(
        public value: number,
    ) {
        _validateUnsigned(value);
        _validateNumRange(_NumType.U16, value, MIN, MAX);
    }
}

export type u16 = U16;

export function u16(): StaticU16;
export function u16(value: number): U16;
export function u16(value?: any): any {
    if (isPresent(value)) {
        return new U16(value!);
    }
    return new StaticU16();
}
