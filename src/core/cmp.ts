import { None, Option } from './option';
import { match } from './match';

export interface PartialEq<Rhs extends PartialEq<any>> {
    eq(other: Rhs): boolean;

    ne(other: Rhs): boolean;
}

export interface Eq<Self extends Eq<any>> extends PartialEq<Self> {
    // Empty
}

export interface Ord<Self extends Ord<any>> extends Eq<Self>, PartialOrd<Self> {
    cmp(other: Self): Less | Equal | Greater;

    max(other: Self): Self;

    min(other: Self): Self;

    clamp(min: Self, max: Self): Self;
}

export interface PartialOrd<Rhs extends PartialOrd<any>> extends PartialEq<Rhs> {
    partialCmp(other: Rhs): Option<Less | Equal | Greater>;

    lt(other: Rhs): boolean;

    le(other: Rhs): boolean;

    gt(other: Rhs): boolean;

    ge(other: Rhs): boolean;
}

enum OrderingType {
    Less = -1,
    Equal = 0,
    Greater = 1,
}

class OrderingImpl implements Eq<OrderingImpl>, Ord<OrderingImpl>, PartialOrd<OrderingImpl> {

    constructor(private type: OrderingType) {}

    isEq(): boolean {
        return this.type === OrderingType.Equal;
    }

    isNe(): boolean {
        return this.type !== OrderingType.Equal;
    }

    isLt(): boolean {
        return this.type === OrderingType.Less;
    }

    isGt(): boolean {
        return this.type === OrderingType.Greater;
    }

    isLe(): boolean {
        return this.type !== OrderingType.Greater;
    }

    isGe(): boolean {
        return this.type !== OrderingType.Less;
    }

    reverse(): Less | Equal | Greater {
        return match(this.type)
            .case(OrderingType.Less, Ordering.Greater)
            .case(OrderingType.Greater, Ordering.Less)
            .default(Ordering.Equal);
    }

    then(other: Less | Equal | Greater): Less | Equal | Greater {
        return match(this.type)
            .case(OrderingType.Equal, other)
            .default(this);
    }

    thenWith(fn: () => Less | Equal | Greater): Less | Equal | Greater {
        return match(this.type)
            .case(OrderingType.Equal, () => fn())
            .default(this);
    }

    cmp(other: Less | Equal | Greater): Less | Equal | Greater {
        if (this.type < getOrderingType(other)) {
            return Ordering.Less;
        } else if (this.type === other.type) {
            return Ordering.Equal;
        } else {
            return Ordering.Greater;
        }
    }

    clamp(min: Less | Equal | Greater, max: Less | Equal | Greater): Less | Equal | Greater {
        const minType = getOrderingType(min);
        const maxType = getOrderingType(min);
        if (this.type < minType) {
            return min;
        } else if (this.type > maxType) {
            return max;
        } else {
            return this;
        }
    }

    eq(other: Less | Equal | Greater): boolean {
        return this.type === getOrderingType(other);
    }

    ge(other: Less | Equal | Greater): boolean {
        return this.type >= getOrderingType(other);
    }

    gt(other: Less | Equal | Greater): boolean {
        return this.type > getOrderingType(other);
    }

    le(other: Less | Equal | Greater): boolean {
        return this.type <= getOrderingType(other);
    }

    lt(other: Less | Equal | Greater): boolean {
        return this.type < getOrderingType(other);
    }

    max(other: Less | Equal | Greater): Less | Equal | Greater {
        return maxBy(this, other, this.cmp.bind(this));
    }

    min(other: Less | Equal | Greater): Less | Equal | Greater {
        return minBy(this, other, this.cmp.bind(this));
    }

    ne(other: Less | Equal | Greater): boolean {
        return false;
    }

    partialCmp(other: Less | Equal | Greater): Option<Less | Equal | Greater> {
        return None(); // TODO
    }
}

class Less extends OrderingImpl {}

class Equal extends OrderingImpl {}

class Greater extends OrderingImpl {}

export class Ordering {
    static Less = new Less(OrderingType.Less);
    static Equal = new Equal(OrderingType.Equal);
    static Greater = new Greater(OrderingType.Greater);
}

export function min<T extends Ord<any>>(v1: T, v2: T): T {
    return v1.min(v2);
}

export function minBy<T>(
    v1: T,
    v2: T,
    compareFn: (arg1: T, arg2: T) => Less | Equal | Greater
): T {
    return match(getOrderingType(compareFn(v1, v2)))
        .case(OrderingType.Less, v1)
        .case(OrderingType.Equal, v1)
        .default(v2);
}

export function minByKey<T,
    F extends (arg: T) => K,
    K extends Ord<any>>(v1: T, v2: T, fn: F): T {
    return minBy(v1, v2, (v1, v2) => fn(v1).cmp(fn(v2)));
}

export function max<T extends Ord<any>>(v1: T, v2: T): T {
    return v1.max(v2);
}

export function maxBy<T>(
    v1: T,
    v2: T,
    compareFn: (arg1: T, arg2: T) => Less | Equal | Greater
): T {
    return match(getOrderingType(compareFn(v1, v2)))
        .case(OrderingType.Less, v2)
        .case(OrderingType.Equal, v2)
        .default(v1);
}

export function maxByKey<T,
    F extends (arg: T) => K,
    K extends Ord<any>>(v1: T, v2: T, fn: F): T {
    return maxBy(v1, v2, (v1, v2) => fn(v1).cmp(fn(v2)));
}

function getOrderingType(other: OrderingImpl): OrderingType {
    let otherWeight: OrderingType = 0;

    if (other.isLt()) {
        otherWeight = -1;
    } else if (other.isGt()) {
        otherWeight = 1;
    }

    return otherWeight;
}
