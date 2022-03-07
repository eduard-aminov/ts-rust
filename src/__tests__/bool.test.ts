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
})
