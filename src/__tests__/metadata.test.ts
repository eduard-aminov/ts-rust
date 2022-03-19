import { DefineMetadata, Metadata, MetadataType } from '../core';

describe('metadata', () => {
    test('hasMetadata', () => {
        @DefineMetadata({type: MetadataType.Some})
        class A {}

        class B extends A {}

        const a = new A();
        const b = new B();

        expect(Metadata.hasMetadata(A)).toEqual(false);
        expect(Metadata.hasMetadata(a)).toEqual(true);
        expect(Metadata.hasMetadata(B)).toEqual(false);
        expect(Metadata.hasMetadata(b)).toEqual(true);
    });

    test('readFrom', () => {
        @DefineMetadata({type: MetadataType.Some})
        class A {}

        const a = new A();

        class B {}
        const b = new B();

        expect(Metadata.readFrom(a).type).toEqual(MetadataType.Some);
        expect(() => Metadata.readFrom(b)).toThrow();
    });

    test('setMetadata', () => {
        @DefineMetadata({type: MetadataType.Some})
        class A {}

        const a = new A();

        class B extends A {}

        const b = new B();

        @DefineMetadata({type: MetadataType.Some})
        class C {}

        const c = new C();
        Metadata.setMetadata(c, {type: MetadataType.None});

        expect(() => Metadata.setMetadata(A, {type: MetadataType.Some})).toThrow();
        expect(Metadata.readFrom(a).type).toEqual(MetadataType.Some);
        expect(() => Metadata.setMetadata(B, {type: MetadataType.Some})).toThrow();
        expect(Metadata.readFrom(b).type).toEqual(MetadataType.Some);
        expect(Metadata.readFrom(c).type).toEqual(MetadataType.None);
    });

    test('compareWithByKey' ,() => {
        @DefineMetadata({type: MetadataType.Some})
        class A {}
        const a = new A();
        @DefineMetadata({type: MetadataType.Some})
        class B {}
        const b = new B();
        @DefineMetadata({type: MetadataType.None})
        class C {}
        const c = new C();

        expect(Metadata.compareWithByKey(a, b, 'type')).toEqual(true);
        expect(Metadata.compareWithByKey(a, c, 'type')).toEqual(false);
    })

    test('isOk', () => {
        @DefineMetadata({type: MetadataType.Ok})
        class A {}
        const a = new A();
        @DefineMetadata({type: MetadataType.Err})
        class B {}
        const b = new B();
        class C {}
        const c = new C();

        expect(Metadata.isOk(a)).toEqual(true);
        expect(Metadata.isOk(b)).toEqual(false);
        expect(Metadata.isOk(c)).toEqual(false);
    })

    test('isErr', () => {
        @DefineMetadata({type: MetadataType.Err})
        class A {}
        const a = new A();
        @DefineMetadata({type: MetadataType.Ok})
        class B {}
        const b = new B();
        class C {}
        const c = new C();

        expect(Metadata.isErr(a)).toEqual(true);
        expect(Metadata.isErr(b)).toEqual(false);
        expect(Metadata.isErr(c)).toEqual(false);
    })

    test('isResult', () => {
        @DefineMetadata({type: MetadataType.Err})
        class A {}
        const a = new A();
        @DefineMetadata({type: MetadataType.Ok})
        class B {}
        const b = new B();
        @DefineMetadata({type: MetadataType.Some})
        class C {}
        const c = new C();
        class D {}
        const d = new D();

        expect(Metadata.isResult(a)).toEqual(true);
        expect(Metadata.isResult(b)).toEqual(true);
        expect(Metadata.isResult(c)).toEqual(false);
        expect(Metadata.isResult(d)).toEqual(false);
    })

    test('isSome', () => {
        @DefineMetadata({type: MetadataType.Some})
        class A {}
        const a = new A();
        @DefineMetadata({type: MetadataType.None})
        class B {}
        const b = new B();
        class C {}
        const c = new C();

        expect(Metadata.isSome(a)).toEqual(true);
        expect(Metadata.isSome(b)).toEqual(false);
        expect(Metadata.isSome(c)).toEqual(false);
    })

    test('isNone', () => {
        @DefineMetadata({type: MetadataType.None})
        class A {}
        const a = new A();
        @DefineMetadata({type: MetadataType.Some})
        class B {}
        const b = new B();
        class C {}
        const c = new C();

        expect(Metadata.isNone(a)).toEqual(true);
        expect(Metadata.isNone(b)).toEqual(false);
        expect(Metadata.isNone(c)).toEqual(false);
    })

    test('isOption', () => {
        @DefineMetadata({type: MetadataType.None})
        class A {}
        const a = new A();
        @DefineMetadata({type: MetadataType.Some})
        class B {}
        const b = new B();
        @DefineMetadata({type: MetadataType.Ok})
        class C {}
        const c = new C();
        class D {}
        const d = new D();

        expect(Metadata.isOption(a)).toEqual(true);
        expect(Metadata.isOption(b)).toEqual(true);
        expect(Metadata.isOption(c)).toEqual(false);
        expect(Metadata.isOption(d)).toEqual(false);
    })
});
