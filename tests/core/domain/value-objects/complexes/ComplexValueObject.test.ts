import { describe, expect, it } from "bun:test";

import { ComplexValueObject } from "@/core/domain/value-objects/complexes/ComplexValueObject";

//#region MOCK

class DummyValueObject extends ComplexValueObject {
  constructor(
    public readonly prop1: string,
    public readonly prop2: number,
  ) {
    super();
  }

  public static create(prop1: string, prop2: number): DummyValueObject {
    return ComplexValueObject.build(
      new DummyValueObject(prop1, prop2),
    ) as DummyValueObject;
  }

  protected validate(): void {
    if (this.prop1 === "invalid") {
      throw new Error("Invalid prop1");
    }
  }

  protected getEqualityComponents(): readonly unknown[] {
    return [this.prop1, this.prop2];
  }
}

class NestedValueObject extends ComplexValueObject {
  constructor(public readonly nestedObj: { a: number }) {
    super();
  }

  public static create(nestedObj: { a: number }): NestedValueObject {
    return ComplexValueObject.build(
      new NestedValueObject(nestedObj),
    ) as NestedValueObject;
  }

  protected validate(): void {}

  protected getEqualityComponents(): readonly unknown[] {
    return [this.nestedObj];
  }
}

class DifferentValueObject extends ComplexValueObject {
  constructor(
    public readonly prop1: string,
    public readonly prop2: number,
  ) {
    super();
  }

  public static create(prop1: string, prop2: number): DifferentValueObject {
    return ComplexValueObject.build(
      new DifferentValueObject(prop1, prop2),
    ) as DifferentValueObject;
  }

  protected validate(): void {}

  protected getEqualityComponents(): readonly unknown[] {
    return [this.prop1, this.prop2];
  }
}

class GenericValueObject extends ComplexValueObject {
  constructor(public readonly val: any) {
    super();
  }

  public static create(val: any): GenericValueObject {
    return ComplexValueObject.build(
      new GenericValueObject(val),
    ) as GenericValueObject;
  }

  protected validate(): void {}

  protected getEqualityComponents(): readonly unknown[] {
    return [this.val];
  }
}

class DynamicLengthValueObject extends ComplexValueObject {
  constructor(public readonly props: any[]) {
    super();
  }

  public static create(props: any[]): DynamicLengthValueObject {
    return ComplexValueObject.build(
      new DynamicLengthValueObject(props),
    ) as DynamicLengthValueObject;
  }

  protected validate(): void {}

  protected getEqualityComponents(): readonly unknown[] {
    return this.props;
  }
}

//#endregion

//#region TESTS

describe("ComplexValueObject", () => {
  describe("Immutability (deepFreeze)", () => {
    it("should freeze primitive properties", () => {
      const vo = DummyValueObject.create("valid", 10);
      expect(Object.isFrozen(vo)).toBe(true);
    });

    it("should deep freeze nested objects", () => {
      const vo = NestedValueObject.create({ a: 1 });
      expect(Object.isFrozen(vo)).toBe(true);
      expect(Object.isFrozen(vo.nestedObj)).toBe(true);
    });

    it("should not attempt to freeze already frozen nested objects", () => {
      const frozenObj = Object.freeze({ b: 2 });
      const vo = NestedValueObject.create({ a: 1, c: frozenObj } as any);
      expect(Object.isFrozen(vo)).toBe(true);
      expect(Object.isFrozen(frozenObj)).toBe(true);
    });
  });

  describe("Validation", () => {
    it("should execute validate method and not throw for valid state", () => {
      expect(() => DummyValueObject.create("valid", 10)).not.toThrow();
    });

    it("should execute validate method and throw for invalid state", () => {
      expect(() => DummyValueObject.create("invalid", 10)).toThrow(
        "Invalid prop1",
      );
    });
  });

  describe("Equality (equals / deepEqual)", () => {
    it("should return true for the exact same instance", () => {
      const vo1 = DummyValueObject.create("test", 1);
      expect(vo1.equals(vo1)).toBe(true);
    });

    it("should return true for different instances with the same values", () => {
      const vo1 = DummyValueObject.create("test", 1);
      const vo2 = DummyValueObject.create("test", 1);
      expect(vo1.equals(vo2)).toBe(true);
    });

    it("should return false for different instances with different values", () => {
      const vo1 = DummyValueObject.create("test", 1);
      const vo2 = DummyValueObject.create("test", 2);
      expect(vo1.equals(vo2)).toBe(false);
    });

    it("should return false when comparing with null or undefined", () => {
      const vo1 = DummyValueObject.create("test", 1);
      expect(vo1.equals(null as any)).toBe(false);
      expect(vo1.equals(undefined as any)).toBe(false);
    });

    it("should return false when comparing different types of Value Objects even with same properties", () => {
      const vo1 = DummyValueObject.create("test", 1);
      const vo2 = DifferentValueObject.create("test", 1);
      expect(vo1.equals(vo2)).toBe(false);
    });

    it("should return true for objects with nested structures that are equal by value", () => {
      const vo1 = NestedValueObject.create({ a: 1 });
      const vo2 = NestedValueObject.create({ a: 1 });
      expect(vo1.equals(vo2)).toBe(true);
    });

    it("should return false for objects with nested structures that are not equal by value", () => {
      const vo1 = NestedValueObject.create({ a: 1 });
      const vo2 = NestedValueObject.create({ a: 2 });
      expect(vo1.equals(vo2)).toBe(false);
    });

    it("should return true for null or undefined values when both are same", () => {
      const vo1 = GenericValueObject.create(null);
      const vo2 = GenericValueObject.create(null);
      expect(vo1.equals(vo2)).toBe(true);

      const vo3 = GenericValueObject.create(undefined);
      const vo4 = GenericValueObject.create(undefined);
      expect(vo3.equals(vo4)).toBe(true);
    });

    it("should return false for null or undefined values when they are different", () => {
      const vo1 = GenericValueObject.create(null);
      const vo2 = GenericValueObject.create(undefined);
      expect(vo1.equals(vo2)).toBe(false);

      const vo3 = GenericValueObject.create(null);
      const vo4 = GenericValueObject.create(1);
      expect(vo3.equals(vo4)).toBe(false);
    });

    it("should return false when types are different", () => {
      const vo1 = GenericValueObject.create(1);
      const vo2 = GenericValueObject.create("1");
      expect(vo1.equals(vo2)).toBe(false);
    });

    it("should return true for arrays that are deeply equal", () => {
      const vo1 = GenericValueObject.create([1, 2, [3, 4]]);
      const vo2 = GenericValueObject.create([1, 2, [3, 4]]);
      expect(vo1.equals(vo2)).toBe(true);
    });

    it("should return false for arrays with different lengths", () => {
      const vo1 = GenericValueObject.create([1, 2]);
      const vo2 = GenericValueObject.create([1, 2, 3]);
      expect(vo1.equals(vo2)).toBe(false);
    });

    it("should return false for arrays with different values", () => {
      const vo1 = GenericValueObject.create([1, 2]);
      const vo2 = GenericValueObject.create([1, 3]);
      expect(vo1.equals(vo2)).toBe(false);
    });

    it("should return false for objects with different number of keys", () => {
      const vo1 = GenericValueObject.create({ a: 1, b: 2 });
      const vo2 = GenericValueObject.create({ a: 1 });
      expect(vo1.equals(vo2)).toBe(false);
    });

    it("should return false if equality components have different lengths", () => {
      const vo1 = DynamicLengthValueObject.create([1, 2]);
      const vo2 = DynamicLengthValueObject.create([1]);
      expect(vo1.equals(vo2)).toBe(false);
    });
  });
});

//#endregion
