export interface Add<Rhs extends Add<any>, Output = Rhs> {
    add(rhs: Rhs): Output;
}

export interface Sub<Rhs extends Sub<any>, Output = Rhs> {
    sub(rhs: Rhs): Output;
}

export interface Mul<Rhs extends Mul<any>, Output = Rhs> {
    mul(rhs: Rhs): Output;
}

export interface Div<Rhs extends Div<any>, Output = Rhs> {
    div(rhs: Rhs): Output;
}

export interface Rem<Rhs extends Rem<any>, Output = Rhs> {
    rem(rhs: Rhs): Output;
}

export interface Neg<Output> {
    neg(): Output;
}
