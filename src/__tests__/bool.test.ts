import { None, Some } from '../core/option';
import { bool } from '../core/primitives/bool';

describe('bool', () => {
    test('thenSome', () => {
        expect(bool(false).thenSome(0)).toEqual(None())
        expect(bool(true).thenSome(0)).toEqual(Some(0))
    })

    test('then', () => {
        expect(bool(false).then(() => 0)).toEqual(None())
        expect(bool(true).then(() => 0)).toEqual(Some(0))
    })

    test('default', () => {
        expect(bool(true).default()).toEqual(bool(false));
        expect(bool(false).default()).toEqual(bool(false));
    })

    test('bitand', () => {
        const a = bool(true);
        const b = bool(false);
        expect(a.bitand(a)).toEqual(bool(true))
        expect(a.bitand(b)).toEqual(bool(false))
        expect(b.bitand(b)).toEqual(bool(false))
        expect(b.bitand(a)).toEqual(bool(false))
    })

    test('bitor', () => {
        const a = bool(true);
        const b = bool(false);
        expect(a.bitor(a)).toEqual(bool(true))
        expect(a.bitor(b)).toEqual(bool(true))
        expect(b.bitor(b)).toEqual(bool(false))
        expect(b.bitor(a)).toEqual(bool(true))
    })

    test('bitxor', () => {
        const a = bool(true);
        const b = bool(false);
        expect(a.bitxor(a)).toEqual(bool(false))
        expect(a.bitxor(b)).toEqual(bool(true))
        expect(b.bitxor(b)).toEqual(bool(false))
        expect(b.bitxor(a)).toEqual(bool(true))
    })

    test('not', () => {
        expect(bool(true).not()).toEqual(bool(false));
        expect(bool(false).not()).toEqual(bool(true));
    })
})
