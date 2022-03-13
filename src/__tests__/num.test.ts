import { i16, i32, i8, u16, u32, u8 } from '../core';

describe('i32', () => {
    test('range validation', () => {
        expect(() => i32(-2147483649)).toThrow();
        expect(() => i32(2147483648)).toThrow();
        expect(i32(5).value).toEqual(5);
    });

    test('MIN', () => {
        expect(i32.MIN.value).toEqual(-2147483648);
    });

    test('MAX', () => {
        expect(i32.MAX.value).toEqual(2147483647);
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
        expect(u32.MIN.value).toEqual(0);
    });

    test('MAX', () => {
        expect(u32.MAX.value).toEqual(2147483647);
    });
});

describe('i8', () => {
    test('range validation', () => {
        expect(() => i8(-129)).toThrow();
        expect(() => i8(128)).toThrow();
        expect(i8(5).value).toEqual(5);
    });

    test('MIN', () => {
        expect(i8.MIN.value).toEqual(-128);
    });

    test('MAX', () => {
        expect(i8.MAX.value).toEqual(127);
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
        expect(u8.MIN.value).toEqual(0);
    });

    test('MAX', () => {
        expect(u8.MAX.value).toEqual(127);
    });
});

describe('i16', () => {
    test('range validation', () => {
        expect(() => i16(-32769)).toThrow();
        expect(() => i16(32768)).toThrow();
        expect(i16(5).value).toEqual(5);
    });

    test('MIN', () => {
        expect(i16.MIN.value).toEqual(-32768);
    });

    test('MAX', () => {
        expect(i16.MAX.value).toEqual(32767);
    });
});

describe('u16', () => {
    test('sign validation', () => {
        expect(() => u16(-1)).toThrow();
    });

    test('range validation', () => {
        expect(() => u16(32768)).toThrow();
        expect(u16(5).value).toEqual(5);
    });

    test('MIN', () => {
        expect(u16.MIN.value).toEqual(0);
    });

    test('MAX', () => {
        expect(u16.MAX.value).toEqual(32767);
    });
});


