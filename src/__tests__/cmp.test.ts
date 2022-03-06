import { Ordering, PartialEq } from '../core/cmp';

describe('PartialEq', () => {

    enum BookFormat {
        Paperback,
        Hardback,
        Ebook,
    }

    class Book implements PartialEq<Book> {
        constructor(
            public isbn: number,
            public format: BookFormat,
        ) {}

        eq(other: Book): boolean {
            return this.isbn === other.isbn;
        }

        ne(other: Book): boolean {
            return this.isbn !== other.isbn;
        }
    }

    const b1 = new Book(3, BookFormat.Paperback);
    const b2 = new Book(3, BookFormat.Ebook);
    const b3 = new Book(10, BookFormat.Paperback);

    test('should equal', () => {
        expect(b1.eq(b2)).toBeTruthy();
        expect(b1.eq(b3)).toBeFalsy();
    });

    test('should not be equal', () => {
        expect(b1.ne(b3)).toBeTruthy();
        expect(b1.ne(b2)).toBeFalsy();
    });
});

describe('Ordering', () => {
    test('isEq', () => {
        expect(Ordering.Less.isEq()).toEqual(false);
        expect(Ordering.Equal.isEq()).toEqual(true);
        expect(Ordering.Greater.isEq()).toEqual(false);
    })

    test('isNe', () => {
        expect(Ordering.Less.isNe()).toEqual(true);
        expect(Ordering.Equal.isNe()).toEqual(false);
        expect(Ordering.Greater.isNe()).toEqual(true);
    })

    test('isLt', () => {
        expect(Ordering.Less.isLt()).toEqual(true);
        expect(Ordering.Equal.isLt()).toEqual(false);
        expect(Ordering.Greater.isLt()).toEqual(false);
    })

    test('isGt', () => {
        expect(Ordering.Less.isGt()).toEqual(false);
        expect(Ordering.Equal.isGt()).toEqual(false);
        expect(Ordering.Greater.isGt()).toEqual(true);
    })

    test('isLe', () => {
        expect(Ordering.Less.isLe()).toEqual(true);
        expect(Ordering.Equal.isLe()).toEqual(true);
        expect(Ordering.Greater.isLe()).toEqual(false);
    })

    test('isGe', () => {
        expect(Ordering.Less.isGe()).toEqual(false);
        expect(Ordering.Equal.isGe()).toEqual(true);
        expect(Ordering.Greater.isGe()).toEqual(true);
    })

    test('reverse', () => {
        expect(Ordering.Less.reverse()).toEqual(Ordering.Greater);
        expect(Ordering.Equal.reverse()).toEqual(Ordering.Equal);
        expect(Ordering.Greater.reverse()).toEqual(Ordering.Less);
    })

    test('then', () => {
        const result1 = Ordering.Equal.then(Ordering.Less);
        const result2 = Ordering.Less.then(Ordering.Equal);
        const result3 = Ordering.Less.then(Ordering.Greater);
        const result4 = Ordering.Equal.then(Ordering.Equal);

        expect(result1).toEqual(Ordering.Less);
        expect(result2).toEqual(Ordering.Less);
        expect(result3).toEqual(Ordering.Less);
        expect(result4).toEqual(Ordering.Equal);
    })

    test('thenWith', () => {
        const result1 = Ordering.Equal.thenWith(() => Ordering.Less);
        const result2 = Ordering.Less.thenWith(() => Ordering.Equal);
        const result3 = Ordering.Less.thenWith(() => Ordering.Greater);
        const result4 = Ordering.Equal.thenWith(() => Ordering.Equal);

        expect(result1).toEqual(Ordering.Less);
        expect(result2).toEqual(Ordering.Less);
        expect(result3).toEqual(Ordering.Less);
        expect(result4).toEqual(Ordering.Equal);
    })
})
