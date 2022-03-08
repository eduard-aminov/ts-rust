import { isPresent } from '../utils';
import { _validateNumRange } from './error';
import { _NumType } from './index';

const MIN = -128;
const MAX = 127;

class StaticI8 {
    readonly MIN = new I8(MIN);
    readonly MAX = new I8(MAX);
}

class I8 {
    constructor(
        public value: number,
    ) {
        _validateNumRange(_NumType.I8, value, MIN, MAX);
    }
}

export type i8 = I8;

export function i8(): StaticI8;
export function i8(value: number): I8;
export function i8(value?: any): any {
    if (isPresent(value)) {
        return new I8(value!);
    }
    return new StaticI8();
}
