export interface Not<Output> {
    not(): Output;
}

export interface BitAnd<Rhs extends BitAnd<any>, Output = Rhs> {
    bitand(rhs: Rhs): Output;
}

export interface BitOr<Rhs extends BitOr<any>, Output = Rhs> {
    bitor(rhs: Rhs): Output;
}

export interface BitXor<Rhs extends BitXor<any>, Output = Rhs> {
    bitxor(rhs: Rhs): Output;
}

export interface Shl<Rhs extends Shl<any>, Output = Rhs> {
    shl(rhs: Rhs): Output;
}

export interface Shr<Rhs extends Shr<any>, Output = Rhs> {
    shr(rhs: Rhs): Output;
}
