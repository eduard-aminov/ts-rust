import { match } from '../core/match';

describe('match', () => {
    describe('direct match', () => {
        test('returns two', () => {
            const result =
                match(2)
                    .case(1, 'one')
                    .case(2, 'two')
                    .default('default value');

            expect(result).toEqual('two');
        });

        test('returns default value when no match', () => {
            const result =
                match(3)
                    .case(1, 'one')
                    .case(2, 'two')
                    .default('default value');

            expect(result).toEqual('default value');
        });

        test('calculate and returns 5', () => {
            const result =
                match(2)
                    .case(1, 'one')
                    .case(2, x => x + 3)
                    .default('default value');

            expect(result).toEqual(5);
        });
    });
});
