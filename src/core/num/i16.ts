import { isPresent } from '../utils';
import { _validateNumRange } from './error';
import { _NumType } from './index';

const MIN = -32768;
const MAX = 32767;

class StaticI16 {
    readonly MIN = new I16(MIN);
    readonly MAX = new I16(MAX);
}

class I16 {
    constructor(
        public value: number,
    ) {
        _validateNumRange(_NumType.I16, value, MIN, MAX);
    }
}

export type i16 = I16;

export function i16(): StaticI16;
export function i16(value: number): I16;
export function i16(value?: any): any {
    if (isPresent(value)) {
        return new I16(value!);
    }
    return new StaticI16();
}
