import { _NumType } from './index';

export function _validateNumRange(
    type: _NumType,
    value: number,
    min: number,
    max: number
): void {
    if (value < min || value > max) {
        throw new Error(`the value ${value} does not fit into the type \`${type}\` whose range is \`${min}..=${max}\``);
    }
}

export function _validateUnsigned(value: number): void {
    if (Math.sign(value) === -1) {
        throw new Error('unsigned values cannot be negated');
    }
}
