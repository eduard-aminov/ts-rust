import { None, Option, Some } from '../option';

class Bool extends Boolean {
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
}

export function bool(value: boolean): Bool {
    return new Bool(value);
}
