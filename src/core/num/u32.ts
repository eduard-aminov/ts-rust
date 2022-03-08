import { isPresent } from '../utils';
import { _validateNumRange, _validateUnsigned } from './error';
import { _NumType } from './index';

const MIN = 0;
const MAX = 2147483647;

class StaticU32 {
    readonly MIN = new U32(MIN);
    readonly MAX = new U32(MAX);
}

class U32 {
    constructor(
        public value: number,
    ) {
        _validateUnsigned(value);
        _validateNumRange(_NumType.U32, value, MIN, MAX);
    }
}

export type u32 = U32;

export function u32(): StaticU32;
export function u32(value: number): U32;
export function u32(value?: any): any {
    if (isPresent(value)) {
        return new U32(value!);
    }
    return new StaticU32();
}
