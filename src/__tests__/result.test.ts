import { bool, Err, None, Ok, Some } from '../core';

describe('result', () => {
    test('isOk', () => {
        const x = Ok(5);
        const y = Err('Some error message');

        expect(x.isOk()).toEqual(bool(true));
        expect(y.isOk()).toEqual(bool(false));
    });

    test('isErr', () => {
        const x = Ok(5);
        const y = Err('Some error message');

        expect(x.isErr()).toEqual(bool(false));
        expect(y.isErr()).toEqual(bool(true));
    });

    test('ok', () => {
        const x = Ok(5);
        const y = Err('Nothing here');

        expect(x.ok()).toEqual(Some(5));
        expect(y.ok()).toEqual(None());
    });

    test('err', () => {
        const x = Ok(5);
        const y = Err('Nothing here');

        expect(x.err()).toEqual(None());
        expect(y.err()).toEqual(Some('Nothing here'));
    });

    test('map', () => {
        const x = Ok('Hello World!');
        const y = Err('Some Error Message');

        expect(x.map(s => s.length)).toEqual(Ok(12));
        expect(y.map(s => s.length)).toEqual(Err(18));
    })
});
