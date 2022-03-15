import { None, Option, Some } from '../option';
import { Default } from '../default';
import { BitAnd, BitOr, BitXor, Not } from '../ops';
import { Equal, Greater, Less, Ord, Ordering } from '../cmp';

interface BoolConstructor {
    new(value: boolean): BoolImpl;

    (value: boolean): BoolImpl;
}

class BoolImpl implements Default<BoolImpl>,
    BitAnd<bool>,
    BitOr<bool>,
    BitXor<bool>,
    Not<bool>,
    Ord<bool> {

    constructor(
        public value: boolean,
    ) {}

    thenSome<T>(value: T): Option<T> {
        if (this.value) {
            return Some(value);
        }
        return None();
    }

    then<T, F extends () => T>(fn: F): Option<T> {
        if (this.value) {
            return Some(fn());
        }
        return None();
    }

    default(): bool {
        return bool(false);
    }

    bitand(rhs: bool): bool {
        return bool(Boolean(+this.value & +rhs.value));
    }

    bitor(rhs: bool): bool {
        return bool(Boolean(+this.value | +rhs.value));
    }

    bitxor(rhs: BoolImpl): BoolImpl {
        return bool(Boolean(+this.value ^ +rhs.value));
    }

    not(): bool {
        return bool(!this.value);
    }

    clamp(min: bool, max: bool): bool {
        const minBit = +min.value;
        const maxBit = +max.value;

        if (minBit > maxBit) {
            throw new Error('Min greater than Max');
        }

        const selfBit = +this.value;

        if (selfBit < minBit) {
            return min;
        } else if (selfBit > maxBit) {
            return max;
        }
        return this;
    }

    cmp(other: bool): Less | Equal | Greater {
        if (this.lt(other).value) {
            return Ordering.Less;
        } else if (this.gt(other).value) {
            return Ordering.Greater;
        } else {
            return Ordering.Equal;
        }
    }

    eq(other: bool): bool {
        return bool(+this.value === +other.value);
    }

    ge(other: bool): bool {
        return bool(+this.value >= +other.value);
    }

    gt(other: bool): bool {
        return bool(+this.value > +other.value);
    }

    le(other: bool): bool {
        return bool(+this.value <= +other.value);
    }

    lt(other: bool): bool {
        return bool(+this.value < +other.value);
    }

    max(other: bool): bool {
        return this.gt(other).value ? this : other;
    }

    min(other: bool): bool {
        return this.lt(other).value ? this : other;
    }

    ne(other: bool): bool {
        return bool(+this.value !== +other.value);
    }

    partialCmp(other: bool): Option<Less | Equal | Greater> {
        return None(); // TODO
    }
}

function factory(value: boolean): bool {
    return new BoolImpl(value);
}

export type bool = BoolImpl;

export const bool = factory as BoolConstructor;
