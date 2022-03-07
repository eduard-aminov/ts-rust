import { None, Option, Some } from '../option';
import { Default } from '../default';
import { BitAnd, BitOr, BitXor, Not } from '../ops/bit';
import { Equal, Greater, Less, Ord, Ordering } from '../cmp';

class Bool extends Boolean implements Default<bool>,
    BitAnd<bool>,
    BitOr<bool>,
    BitXor<bool>,
    Not<bool>,
    Ord<bool> {

    thenSome<T>(value: T): Option<T> {
        if (this.valueOf()) {
            return Some(value);
        }
        return None();
    }

    then<T, F extends () => T>(fn: F): Option<T> {
        if (this.valueOf()) {
            return Some(fn());
        }
        return None();
    }

    default(): bool {
        return bool(false);
    }

    bitand(rhs: bool): bool {
        return bool(Boolean(+this.valueOf() & +rhs.valueOf()));
    }

    bitor(rhs: bool): bool {
        return bool(Boolean(+this.valueOf() | +rhs.valueOf()));
    }

    bitxor(rhs: Bool): Bool {
        return bool(Boolean(+this.valueOf() ^ +rhs.valueOf()));
    }

    not(): bool {
        return bool(!this.valueOf());
    }

    clamp(min: bool, max: bool): bool {
        const minBit = +min.valueOf();
        const maxBit = +max.valueOf();

        if (minBit > maxBit) {
            throw new Error('Min greater than Max');
        }

        const selfBit = +this.valueOf();

        if (selfBit < minBit) {
            return min;
        } else if (selfBit > maxBit) {
            return max;
        }
        return this;
    }

    cmp(other: bool): Less | Equal | Greater {
        if (this.lt(other).valueOf()) {
            return Ordering.Less;
        } else if (this.gt(other).valueOf()) {
            return Ordering.Greater;
        } else {
            return Ordering.Equal;
        }
    }

    eq(other: bool): bool {
        return bool(+this.valueOf() === +other.valueOf());
    }

    ge(other: bool): bool {
        return bool(+this.valueOf() >= +other.valueOf());
    }

    gt(other: bool): bool {
        return bool(+this.valueOf() > +other.valueOf());
    }

    le(other: bool): bool {
        return bool(+this.valueOf() <= +other.valueOf());
    }

    lt(other: bool): bool {
        return bool(+this.valueOf() < +other.valueOf());
    }

    max(other: bool): bool {
        return this.gt(other).valueOf() ? this : other;
    }

    min(other: bool): bool {
        return this.lt(other).valueOf() ? this : other;
    }

    ne(other: bool): bool {
        return bool(+this.valueOf() !== +other.valueOf());
    }

    partialCmp(other: bool): Option<Less | Equal | Greater> {
        return None(); // TODO
    }
}

export type bool = Bool;

export function bool(value: boolean): bool {
    return new Bool(value);
}
