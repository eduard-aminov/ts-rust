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
