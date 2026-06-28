import { describe, expect, it } from "bun:test";

import { Entity } from "@/core/domain/entities/Entity";

//#region MOCK

class DummyEntity extends Entity<string> {
  constructor(
    id: string,
    public readonly prop1: string,
  ) {
    super(id);
  }

  public static create(id: string, prop1: string): DummyEntity {
    return Entity.build(new DummyEntity(id, prop1)) as DummyEntity;
  }

  protected validate(): void {
    if (this.prop1 === "invalid") {
      throw new Error("Invalid prop1");
    }
  }

  // Exposes protected method deepEqual for testing
  public static testDeepEqual(a: unknown, b: unknown): boolean {
    return this.deepEqual(a, b);
  }
}

class DifferentEntity extends Entity<string> {
  constructor(id: string) {
    super(id);
  }

  public static create(id: string): DifferentEntity {
    return Entity.build(new DifferentEntity(id)) as DifferentEntity;
  }

  protected validate(): void {}
}

//#endregion

//#region TESTS

describe("Entity", () => {
  describe("Validation (build)", () => {
    it("should execute validate method and not throw for valid state", () => {
      expect(() => DummyEntity.create("id-1", "valid")).not.toThrow();
    });

    it("should execute validate method and throw for invalid state", () => {
      expect(() => DummyEntity.create("id-1", "invalid")).toThrow(
        "Invalid prop1",
      );
    });
  });

  describe("Equality (equals)", () => {
    it("should return true for the exact same instance", () => {
      const entity1 = DummyEntity.create("id-1", "test");
      expect(entity1.equals(entity1)).toBe(true);
    });

    it("should return true for different instances with the same id", () => {
      const entity1 = DummyEntity.create("id-1", "test");
      const entity2 = DummyEntity.create("id-1", "different-prop");
      expect(entity1.equals(entity2)).toBe(true);
    });

    it("should return false for different instances with different ids", () => {
      const entity1 = DummyEntity.create("id-1", "test");
      const entity2 = DummyEntity.create("id-2", "test");
      expect(entity1.equals(entity2)).toBe(false);
    });

    it("should return false when comparing with null or undefined", () => {
      const entity1 = DummyEntity.create("id-1", "test");
      expect(entity1.equals(null as any)).toBe(false);
      expect(entity1.equals(undefined as any)).toBe(false);
    });

    it("should return false when comparing different types of Entities even with same id", () => {
      const entity1 = DummyEntity.create("id-1", "test");
      const entity2 = DifferentEntity.create("id-1");
      expect(entity1.equals(entity2 as any)).toBe(false);
    });
  });

  describe("Deep Equal (deepEqual)", () => {
    it("should return true for primitive equality", () => {
      expect(DummyEntity.testDeepEqual(1, 1)).toBe(true);
      expect(DummyEntity.testDeepEqual("test", "test")).toBe(true);
      expect(DummyEntity.testDeepEqual(true, true)).toBe(true);
    });

    it("should return false for primitive inequality", () => {
      expect(DummyEntity.testDeepEqual(1, 2)).toBe(false);
      expect(DummyEntity.testDeepEqual("test", "test2")).toBe(false);
      expect(DummyEntity.testDeepEqual(true, false)).toBe(false);
    });

    it("should handle null and undefined", () => {
      expect(DummyEntity.testDeepEqual(null, null)).toBe(true);
      expect(DummyEntity.testDeepEqual(undefined, undefined)).toBe(true);
      expect(DummyEntity.testDeepEqual(null, undefined)).toBe(false);
      expect(DummyEntity.testDeepEqual(null, 1)).toBe(false);
      expect(DummyEntity.testDeepEqual(undefined, 1)).toBe(false);
    });

    it("should return true for equal arrays", () => {
      expect(DummyEntity.testDeepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(DummyEntity.testDeepEqual([{ a: 1 }], [{ a: 1 }])).toBe(true);
    });

    it("should return false for unequal arrays", () => {
      expect(DummyEntity.testDeepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
      expect(DummyEntity.testDeepEqual([1, 2, 3], [1, 2])).toBe(false);
    });

    it("should return true for equal objects", () => {
      expect(
        DummyEntity.testDeepEqual({ a: 1, b: "test" }, { a: 1, b: "test" }),
      ).toBe(true);
      expect(DummyEntity.testDeepEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(
        true,
      );
    });

    it("should return false for unequal objects", () => {
      expect(
        DummyEntity.testDeepEqual({ a: 1, b: "test" }, { a: 1, b: "test2" }),
      ).toBe(false);
      expect(DummyEntity.testDeepEqual({ a: 1, b: "test" }, { a: 1 })).toBe(
        false,
      );
      expect(DummyEntity.testDeepEqual({ a: 1 }, { b: 1 })).toBe(false);
      expect(DummyEntity.testDeepEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(
        false,
      );
    });

    it("should return false for different types", () => {
      expect(DummyEntity.testDeepEqual(1, "1")).toBe(false);
      expect(DummyEntity.testDeepEqual({ a: 1 }, [1])).toBe(false);
    });
  });
});

//#endregion
