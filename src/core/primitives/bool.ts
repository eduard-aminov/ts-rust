import { None, Option, Some } from '../option';
import { Default } from '../default';

class Bool extends Boolean implements Default<bool> {
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
}

export type bool = Bool;

export function bool(value: boolean): bool {
    return new Bool(value);
}
