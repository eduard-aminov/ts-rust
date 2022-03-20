import { bool, Err, None, Ok, Option, Result, Some } from '../core';

describe('Option', () => {

    test('isSome', () => {
        const x = Some(42);
        const y = None();

        expect(x.isSome()).toEqual(bool(true));
        expect(y.isSome()).toEqual(bool(false));
    });

    test('isNone', () => {
        const x = Some(42);
        const y = None();

        expect(x.isNone()).toEqual(bool(false));
        expect(y.isNone()).toEqual(bool(true));
    });

    test('contains', () => {
        const x = Some(42);
        const y = None();

        expect(x.contains(42)).toEqual(bool(true));
        expect(x.contains(2)).toEqual(bool(false));
        expect(y.contains(2)).toEqual(bool(false));
    });

    test('expect', () => {
        const x = Some('value');
        const y = None();

        expect(x.expect('fruits are healthy')).toEqual('value');
        expect(() => y.expect('fruits are healthy')).toThrow('fruits are healthy');
    });

    test('unwrap', () => {
        const x = Some(42);
        const y = None();

        expect(x.unwrap()).toEqual(42);
        expect(() => y.unwrap()).toThrow();
    });

    test('unwrapOr', () => {
        const x = Some(42);
        const y = None();

        expect(x.unwrapOr(100)).toEqual(42);
        expect(y.unwrapOr(100)).toEqual(100);
    });

    test('unwrapOrElse', () => {
        const x = Some(42);
        const y = None();
        const k = 100;

        expect(x.unwrapOrElse(() => k * k)).toEqual(42);
        expect(y.unwrapOrElse(() => k + k)).toEqual(200);
    });

    xtest('inspect', () => {
        const logSpy = jest.spyOn(console, 'log');
        const x = Some(42);
        const y = None();

        x.inspect(x => console.log(`Got ${x}`));
        y.inspect(x => console.log(`Got ${x}`));

        expect(logSpy).toHaveBeenCalledWith('Got 42');
        expect(logSpy).toHaveBeenCalledTimes(1);
    });

    test('map', () => {
        const x = Some('Hello World!');
        const y = None();

        expect(x.map(s => s.length)).toEqual(Some(12));
        expect(y.map(s => s.length)).toEqual(None());
    });

    test('mapOr', () => {
        const x = Some('Hello World!');
        const y = None();

        expect(x.mapOr(42, s => s.length)).toEqual(12);
        expect(y.mapOr(42, s => s.length)).toEqual(42);
    });

    test('mapOrElse', () => {
        const k = 21;
        const x = Some('Hello World!');
        const y = None();

        expect(x.mapOrElse(() => 2 * k, s => s.length)).toEqual(12);
        expect(y.mapOrElse(() => 2 * k, s => s.length)).toEqual(42);
    });

    test('okOr', () => {
        const x = Some('foo');
        const y = None();

        expect(x.okOr(0)).toEqual(Ok('foo'));
        expect(y.okOr(0)).toEqual(Err(0));
    });

    test('okOrElse', () => {
        const x = Some('foo');
        const y = None();

        expect(x.okOrElse(() => 0)).toEqual(Ok('foo'));
        expect(y.okOrElse(() => 0)).toEqual(Err(0));
    });

    test('and', () => {
        const x = Some(42);
        const y = None();
        const z = Some(100);

        expect(x.and(y)).toEqual(None());
        expect(y.and(x)).toEqual(None());
        expect(y.and(y)).toEqual(None());
        expect(x.and(z)).toEqual(Some(100));
    });

    test('andThen', () => {
        const sq = (x: number) => Some(x * x);
        const nope = (_: number) => None();

        const x = Some(2);
        const y = None();

        expect(x.andThen(sq).andThen(sq)).toEqual(Some(16));
        expect(x.andThen(sq).andThen(nope)).toEqual(None());
        expect(x.andThen(nope).andThen(sq)).toEqual(None());
        expect(y.andThen(sq).andThen(sq)).toEqual(None());
    });

    test('or', () => {
        const x = Some(42);
        const y = None();
        const z = Some(100);

        expect(x.or(y)).toEqual(Some(42));
        expect(y.or(x)).toEqual(Some(42));
        expect(x.or(z)).toEqual(Some(42));
        expect(y.or(y)).toEqual(None());
    });

    test('orElse', () => {
        const nobody = (): Option<unknown> => None();
        const vikings = (): Option<string> => Some('vikings');

        const x = Some('barbarians');
        const y = None();

        expect(x.orElse(vikings)).toEqual(Some('barbarians'));
        expect(y.orElse(vikings)).toEqual(Some('vikings'));
        expect(y.orElse(nobody)).toEqual(None());
    });

    test('filter', () => {
        const isEven = (n: number) => n % 2 === 0;

        const x = Some(4);
        const y = Some(3);
        const z = None();

        expect(x.filter(isEven)).toEqual(Some(4));
        expect(y.filter(isEven)).toEqual(None());
        expect(z.filter(isEven)).toEqual(None());
    });

    test('insert', () => {
        const x = None();
        const y = Some(1);

        x.insert(0);
        y.insert(2);
        y.insert(3);
        expect(x.unwrap()).toEqual(0);
        expect(y.unwrap()).toEqual(3);
    });

    test('getOrInsert', () => {
        const x = None();
        const y = Some(2);

        x.getOrInsert(1);
        y.getOrInsert(3);

        expect(x.unwrap()).toEqual(1);
        expect(y.unwrap()).toEqual(2);
    });

    test('getOrInsertWith', () => {
        const x = None();
        const y = Some(2);

        x.getOrInsertWith(() => 1);
        y.getOrInsertWith(() => 3);

        expect(x.unwrap()).toEqual(1);
        expect(y.unwrap()).toEqual(2);
    });

    test('take', () => {
        const x = Some(2);
        const y = x.take();
        const z = None();
        const w = z.take();

        expect(x.isNone()).toEqual(bool(true));
        expect(y.unwrap()).toEqual(2);
        expect(z.isNone()).toEqual(bool(true));
        expect(w.isNone()).toEqual(bool(true));
    });

    test('replace', () => {
        const x = Some(2);
        const y = x.replace(5);
        const z = None();
        const w = z.replace(3);

        expect(x.unwrap()).toEqual(5);
        expect(y.unwrap()).toEqual(2);
        expect(z.unwrap()).toEqual(3);
        expect(w.isNone()).toEqual(bool(true));
    });

    test('zip', () => {
        const x = Some(1);
        const y = Some('hello');
        const z = None();

        expect(x.zip(y)).toEqual(Some([1, 'hello']));
        expect(x.zip(z)).toEqual(None());
    });

    test('zipWith', () => {
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

        expect(x.zipWith(y, mapToPoint)).toEqual(expectedValue);
        expect(x.zipWith(None(), mapToPoint)).toEqual(None());
    });

    test('flatten', () => {
        const x = Some(Some(Some(5)));
        const y = None();

        expect(x.flatten().flatten()).toEqual(Some(5));
        expect(y.flatten()).toEqual(None());
    });

    test('transpose', () => {
        const x: Result<Option<number>, string> = Ok(Some(5));
        const y: Option<Result<number, string>> = Some(Ok(5));

        expect(y.transpose()).toEqual(x);
    });

    test('default', () => {
        const x = Some.default();
        const y = None.default();

        expect(x).toEqual(None());
        expect(y).toEqual(None());
    });
});
