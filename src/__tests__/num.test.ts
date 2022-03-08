import { i32 } from '../core/num/i32';
import { u32 } from '../core/num/u32';

describe('i32', () => {
    test('range validation', () => {
        expect(() => i32(-2147483649)).toThrow();
        expect(() => i32(2147483648)).toThrow();
        expect(i32(5).value).toEqual(5);
    });

    test('MIN', () => {
        expect(i32().MIN.value).toEqual(-2147483648);
    });

    test('MAX', () => {
        expect(i32().MAX.value).toEqual(2147483647);
    });
});

describe('u32', () => {
    test('sign validation', () => {
        expect(() => u32(-1)).toThrow();
    });

    test('range validation', () => {
        expect(() => u32(2147483648)).toThrow();
        expect(u32(5).value).toEqual(5);
    });

    test('MIN', () => {
        expect(u32().MIN.value).toEqual(0);
    });

    test('MAX', () => {
        expect(u32().MAX.value).toEqual(2147483647);
    });
});

