import { str } from '../core/str/str';
import { u8 } from '../core/num/u8';

describe('str', () => {
    test('asBytes', () => {
        const x = str('hello my name is 24$%U@*\'\'"').asBytes();

        expect(x).toEqual([104, 101, 108, 108, 111, 32, 109, 121, 32, 110, 97, 109, 101, 32, 105, 115, 32, 50, 52, 36, 37, 85, 64, 42, 39, 39, 34].map(u8));
    });
});
