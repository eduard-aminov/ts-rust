import { u8 } from '../num';

interface StrConstructor {
    new(value: string): Str;

    (value: string): Str;
}

class Str {
    constructor(
        public value: string,
    ) {}

    asBytes(): u8[] {
        const encoder = new TextEncoder();
        return Array.from(
            encoder.encode(this.value),
            item => u8(item)
        );
    }
}

export type str = Str;

export const str = function (value: string): str {
    return new Str(value);
} as StrConstructor;
