import { bool, Err, Ok, Some } from '../core';

describe('result', () => {
    test('isOk', () => {
        const x = Ok(5);
        expect(x.isOk()).toEqual(bool(true));
        expect(x.isErr()).toEqual(bool(false));
    });

    test('ok', () => {
        const x = Ok(5);
        expect(x.ok()).toEqual(Some(5));
    });

    test('err', () => {
        const x = Err('error');
        expect(x.err()).toEqual(Some('error'));
    });
});
