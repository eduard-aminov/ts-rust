import { i32 } from '../core/num/i32';
import { u32 } from '../core/num/u32';
import { u8 } from '../core/num/u8';
import { i8 } from '../core/num/i8';

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

describe('i8', () => {
    test('range validation', () => {
        expect(() => i8(-129)).toThrow();
        expect(() => i8(128)).toThrow();
        expect(i8(5).value).toEqual(5);
    });

    test('MIN', () => {
        expect(i8().MIN.value).toEqual(-128);
    });

    test('MAX', () => {
        expect(i8().MAX.value).toEqual(127);
    });
});

describe('u8', () => {
    test('sign validation', () => {
        expect(() => u8(-1)).toThrow();
    });

    test('range validation', () => {
        expect(() => u8(128)).toThrow();
        expect(u8(5).value).toEqual(5);
    });

    test('MIN', () => {
        expect(u8().MIN.value).toEqual(0);
    });

    test('MAX', () => {
        expect(u8().MAX.value).toEqual(127);
    });
});


