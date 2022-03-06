import { None, Option, Some } from '../core/option';

describe('Option', () => {
    describe('isSome', () => {
        test('returns true', () => {
            const x = Some(42);

            expect(x.isSome()).toBeTruthy();
        });

        test('returns false', () => {
            const x = None();

            expect(x.isSome()).toBeFalsy();
        });
    });

    describe('isNone', () => {
        test('returns true', () => {
            const x = None();

            expect(x.isNone()).toBeTruthy();
        });

        test('returns false', () => {
            const x = Some(42);

            expect(x.isNone()).toBeFalsy();
        });
    });

    describe('contains', () => {
        test('returns true (if Some contains)', () => {
            const x = Some(42);

            expect(x.contains(42)).toBeTruthy();
        });

        test('returns false (if Some does not contains)', () => {
            const x = Some(42);

            expect(x.contains(2)).toBeFalsy();
        });

        test('returns false (if None)', () => {
            const x = None();

            expect(x.contains(42)).toBeFalsy();
        });
    });

    describe('expect', () => {
        test('returns the contained Some value', () => {
            const x = Some('value');

            expect(x.expect('fruits are healthy')).toEqual('value');
        });

        test('throw error with message (if None)', () => {
            const x = None();

            expect(() => x.expect('fruits are healthy')).toThrow('fruits are healthy');
        });
    });

    describe('unwrap', () => {
        test('returns the contained Some value', () => {
            const x = Some(42);

            expect(x.unwrap()).toEqual(42);
        });

        test('throw error (if None)', () => {
            const x = None();

            expect(() => x.unwrap()).toThrowError();
        });
    });

    describe('unwrapOr', () => {
        test('returns the contained Some value', () => {
            const x = Some(42);

            expect(x.unwrapOr(100)).toEqual(42);
        });

        test('returns default value (if None)', () => {
            const x = None();

            expect(x.unwrapOr('default')).toEqual('default');
        });
    });

    describe('unwrapOrElse', () => {
        test('returns the contained Some value', () => {
            const x = Some(42);
            const k = 100;

            expect(x.unwrapOrElse(() => k * k)).toEqual(42);
        });

        test('returns computed value from closure (if None)', () => {
            const x = None();
            const k = 100;

            expect(x.unwrapOrElse(() => k * k)).toEqual(10000);
        });
    });

    describe('map', () => {
        test('map Option by applying a function to a contained value', () => {
            const x = Some('Hello World!');

            expect(x.map(s => s.length)).toEqual(Some(12));
        });

        test('returns None (if None)', () => {
            const x = None();

            expect(x.map(s => s.length)).toEqual(x);
        });
    });

    describe('mapOr', () => {
        test('applies a function to the contained value (if any)', () => {
            const x = Some('Hello World!');

            expect(x.mapOr(42, s => s.length)).toEqual(12);
        });

        test('returns the provided default result (if None)', () => {
            const x = None();

            expect(x.mapOr(42, s => s.length)).toEqual(42);
        });
    });

    describe('mapOrElse', () => {
        const k = 21;
        test('applies a function to the contained value (if any)', () => {
            const x = Some('Hello World!');

            expect(x.mapOrElse(() => 2 * k, s => s.length)).toEqual(12);
        });

        test('computes a default function result (if None)', () => {
            const x = None();

            expect(x.mapOrElse(() => 2 * k, s => s.length)).toEqual(42);
        });
    });

    describe('and', () => {
        test('Some && None returns None', () => {
            const x = Some(42);
            const y = None();

            expect(x.and(y)).toEqual(y);
        });

        test('None && Some returns None', () => {
            const x = None();
            const y = Some(42);

            expect(x.and(y)).toEqual(x);
        });

        test('Some && Some returns Some', () => {
            const x = Some(42);
            const y = Some(100);

            expect(x.and(y)).toEqual(y);
        });

        test('None && None returns None', () => {
            const x = None();
            const y = None();

            expect(x.and(y)).toEqual(x);
        });
    });

    describe('andThen', () => {
        const sq = (x: number) => Some(x * x);
        const nope = (_: number) => None();

        test('applies a function with the wrapped value and returns the result (if any)', () => {
            const x = Some(2);

            expect(x.andThen(sq).andThen(sq)).toEqual(Some(16));
        });

        test('return None (is None)', () => {
            expect(Some(2).andThen(sq).andThen(nope)).toEqual(None());
            expect(Some(2).andThen(nope).andThen(sq)).toEqual(None());
            expect(None().andThen(sq).andThen(sq)).toEqual(None());
        });
    });

    describe('or', () => {
        test('Some || None returns Some', () => {
            const x = Some(42);
            const y = None();

            expect(x.or(y)).toEqual(x);
        });

        test('None || Some returns Some', () => {
            const x = None();
            const y = Some(42);

            expect(x.or(y)).toEqual(y);
        });

        test('Some || Some returns Some', () => {
            const x = Some(42);
            const y = Some(100);

            expect(x.or(y)).toEqual(x);
        });

        test('None || None returns None', () => {
            const x = None();
            const y = None();

            expect(x.or(y)).toEqual(x);
        });
    });

    describe('orElse', () => {
        const nobody = (): Option<unknown> => None();
        const vikings = (): Option<string> => Some('vikings');

        test('returns the option if it contains a value', () => {
            const x = Some('barbarians');

            expect(x.orElse(vikings)).toEqual(x);
        });

        test('call fn and returns the result (if None)', () => {
            const x = None();

            expect(x.orElse(vikings)).toEqual(Some('vikings'));
            expect(x.orElse(nobody)).toEqual(x);
        });
    });

    // describe('xor', () => {
    //     test('Some ^ None returns Some', () => {
    //         const x = Some(42);
    //         const y = None();
    //
    //         expect(x.xor(y)).toEqual(x);
    //     });
    //
    //     test('None ^ Some returns Some', () => {
    //         const x = None();
    //         const y = Some(42);
    //
    //         expect(x.xor(y)).toEqual(y);
    //     });
    //
    //     test('Some ^ Some returns None', () => {
    //         const x = Some(42);
    //         const y = Some(100);
    //
    //         expect(x.xor(y)).toEqual(None());
    //     });
    //
    //     test('None ^ None returns None', () => {
    //         const x = None();
    //         const y = None();
    //
    //         expect(x.xor(y)).toEqual(x);
    //     });
    // });

    describe('filter', () => {
        const isEven = (n: number) => n % 2 === 0;

        describe('calls predicate with the wrapped value and returns:', () => {
            test('Some(t) if predicate returns true', () => {
                const x = Some(3);

                expect(x.filter(isEven)).toEqual(None());
            });

            test('None if predicate returns false', () => {
                const x = Some(4);

                expect(x.filter(isEven)).toEqual(x);
            });
        });

        test('return None (if None)', () => {
            const x = None();

            expect(x.filter(isEven)).toEqual(x);
        });
    });

    describe('insert', () => {
        test('inserts value into the option and returns that value', () => {
            const x = None();
            const y = Some(1);

            x.insert(0);
            y.insert(2);
            y.insert(3);

            expect(x.unwrap()).toEqual(0);
            expect(y.unwrap()).toEqual(3);
        });
    });

    describe('getOrInsert', () => {
        test('inserts value into the option and returns that value (if None)', () => {
            const x = None();
            const y = Some(2);

            x.getOrInsert(1);
            y.getOrInsert(3);

            expect(x.unwrap()).toEqual(1);
            expect(y.unwrap()).toEqual(2);
        });
    });

    describe('getOrInsertWith', () => {
        test('inserts computed value from fn into the option and returns that value (if None)', () => {
            const x = None();
            const y = Some(2);

            x.getOrInsertWith(() => 1);
            y.getOrInsertWith(() => 3);

            expect(x.unwrap()).toEqual(1);
            expect(y.unwrap()).toEqual(2);
        });
    });

    describe('take', () => {
        test('takes the value out of the option, leaving a None in its place. (if Any)', () => {
            const x = Some(2);
            const y = x.take();

            expect(x).toEqual(None());
            expect(y).toEqual(Some(2));
        });

        test('takes the value out of the option, leaving a None in its place. (if None)', () => {
            const x = None();
            const y = x.take();

            expect(x).toEqual(None());
            expect(y).toEqual(None());
        });
    });

    describe('replace', () => {
        test('replaces the actual value in the option by the value given in parameter, returning the old value (if Any)', () => {
            const x = Some(2);
            const y = x.replace(5);

            expect(x).toEqual(Some(5));
            expect(y).toEqual(Some(2));
        });

        test('replaces the actual value in the option by the value given in parameter, returning the old value (if None)', () => {
            const x = None();
            const y = x.replace(3);

            expect(x).toEqual(Some(3));
            expect(y).toEqual(None());
        });
    });

    describe('zip', () => {
        test('returns Some((s, o)) (if self and other Some)', () => {
            const x = Some(1);
            const y = Some('hello');

            expect(x.zip(y)).toEqual(Some([1, 'hello']));
        });

        test('returns None (if None)', () => {
            const x = Some(1);
            const y = None();

            expect(x.zip(y)).toEqual(None());
        });
    });

    describe('zipWith', () => {
        class Point {
            constructor(
                public x: number,
                public y: number,
            ) {}
        }

        const mapToPoint = (arg1: number, arg2: number) => new Point(arg1, arg2);

        const x = Some(17);
        const y = Some(42);
        const expectedValue = Some(new Point(17, 42));

        test('returns Some(fn(s, o)) (if self and other Some)', () => {
            expect(x.zipWith(y, mapToPoint)).toEqual(expectedValue);
        });

        test('returns None (if None)', () => {
            expect(x.zipWith(None(), mapToPoint)).toEqual(None());
        });
    });
});
