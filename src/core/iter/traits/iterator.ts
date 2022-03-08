import { Option } from '../../option';

export interface Iterator<Item> {
    [Symbol.iterator](): {
        next(): IteratorResult<Item, Item>
    };

    next(): Option<Item>;
}
