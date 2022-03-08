import { i32 } from '../core/num/i32';

describe('i32', () => {
    test('range validation', () => {
        expect(() => i32(-2147483649)).toThrow();
        expect(() => i32(2147483648)).toThrow();
        expect(i32(5).value).toEqual(5);
    });
});
