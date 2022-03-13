import { _, match, None, Some } from '../core';

describe('match', () => {

    test('cmpValue = number, result = string, not default case', () => {
        const result =
            match(1)
                .case(1, 'one')
                .case(2, 'two')
                .default('default value');

        expect(result).toEqual('one');
    });

    test('cmpValue = number, result = string, not default case', () => {
        const result =
            match(2)
                .case(1, 'one')
                .case(2, 'two')
                .default('default value');

        expect(result).toEqual('two');
    });

    test('cmpValue = number, result = string, default case', () => {
        const result =
            match(5)
                .case(1, 'one')
                .case(2, 'two')
                .default('default value');

        expect(result).toEqual('default value');
    });

    test('cmpValue = number, result = func, not default case', () => {
        const result =
            match(5)
                .case(1, 'one')
                .case(5, x => x + 3)
                .default('default value');

        expect(result).toEqual(8);
    });

    test('cmpValue = None(), result = number, not default case', () => {
        const result =
            match(None())
                .case(Some(1), 1)
                .case(Some(2), 2)
                .case(None(), 3)
                .default('default value');

        expect(result).toEqual(3);
    });

    test('cmpValue = None(), result = number, not default case', () => {
        const result =
            match(None())
                .case(Some(1), 1)
                .case(Some(2), 2)
                .case(None(), 3)
                .default('default value');

        expect(result).toEqual(3);
    });

    test('cmpValue = None(), result = number, default case', () => {
        const result =
            match(None())
                .case(Some(1), 1)
                .case(Some(2), 2)
                .default('default value');

        expect(result).toEqual('default value');
    });

    test('cmpValue = None(), result = number, not default case', () => {
        const result =
            match(Some(5))
                .case(Some(1), 1)
                .case(Some(2), 2)
                .case(Some(5), 5)
                .case(None(), 3)
                .default('default value');

        expect(result).toEqual(5);
    });

    test('cmpValue = None(), result = number, default case', () => {
        const result =
            match(Some(5))
                .case(Some(1), 1)
                .case(Some(2), 2)
                .case(Some(3), 3)
                .case(None(), 3)
                .default('default value');

        expect(result).toEqual('default value');
    });

    test('cmpValue = Some(), result = number, not default case', () => {
        const result =
            match(Some(5))
                .case(Some(1), 1)
                .case(Some(2), 2)
                .case(Some(5), 5)
                .case(None(), 3)
                .default('default value');

        expect(result).toEqual(5);
    });

    test('cmpValue = Some(), result = func, not default case', () => {
        const result =
            match(Some(5))
                .case(Some(1), 1)
                .case(Some(2), 2)
                .case(Some(5), x => x + 5)
                .case(None(), 3)
                .default('default value');

        expect(result).toEqual(10);
    });

    test('cmpValue = Some(), result = func, default case', () => {
        const result =
            match(Some(54))
                .case(Some(1), 1)
                .case(Some(2), 2)
                .case(Some(5), x => x + 5)
                .case(None(), 3)
                .default('default value');

        expect(result).toEqual('default value');
    });


    test('cmpValue = Some(_), result = number, not default case', () => {
        const result =
            match(Some(54))
                .case(Some(1), 1)
                .case(Some(_), 2)
                .case(None(), 3)
                .default('default value');

        expect(result).toEqual(2);
    });

    test('cmpValue = Some(_), result = func, not default case', () => {
        const result =
            match(Some(54))
                .case(Some(1), 1)
                .case(Some(_), x => x + 2)
                .case(None(), 3)
                .default('default value');

        expect(result).toEqual(56);
    });

    test('cmpValue = None(), result = number, not default case', () => {
        const result =
            match(None())
                .case(Some(1), 1)
                .case(Some(_), x => x + 2)
                .case(None(), 3)
                .default('default value');

        expect(result).toEqual(3);
    });
});
