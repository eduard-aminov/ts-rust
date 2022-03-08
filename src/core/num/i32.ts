import { isPresent } from '../utils';
import { _validateNumRange } from './error';
import { _NumType } from './index';

const MIN = -2147483648;
const MAX = 2147483647;

class StaticI32 {
    readonly MIN = new I32(MIN);
    readonly MAX = new I32(MAX);
}

class I32 {
    constructor(
        public value: number,
    ) {
        _validateNumRange(_NumType.I32, value, MIN, MAX);
    }
}

export type i32 = I32;

export function i32(): StaticI32;
export function i32(value: number): I32;
export function i32(value?: any): any {
    if (isPresent(value)) {
        return new I32(value!);
    }
    return new StaticI32();
}
