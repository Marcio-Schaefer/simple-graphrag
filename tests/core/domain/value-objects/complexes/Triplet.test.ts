import { describe, expect, it } from "bun:test";

import { Triplet } from "@/core/domain/value-objects/complexes/Triplet";

describe("Triplet", () => {
  describe("Immutability (deepFreeze)", () => {
    it("should freeze properties", () => {
      const triplet = Triplet.create("subject", "relation", "object");
      expect(Object.isFrozen(triplet)).toBe(true);
    });
  });

  describe("Validation", () => {
    it("should execute validate method and not throw for valid state", () => {
      expect(() => Triplet.create("subject", "relation", "object")).not.toThrow();
    });

    it("should trim spaces from subject, relation, and object", () => {
      const triplet = Triplet.create(" subject ", " relation ", " object ");
      expect(triplet.getSubject()).toBe("subject");
      expect(triplet.getRelation()).toBe("relation");
      expect(triplet.getObject()).toBe("object");
    });

    it("should execute validate method and throw for empty subject", () => {
      expect(() => Triplet.create("", "relation", "object")).toThrow(
        "Triplet inválida: sujeito, relação e objeto não podem ser vazios.",
      );
      // Tests trimming to empty string
      expect(() => Triplet.create("   ", "relation", "object")).toThrow(
        "Triplet inválida: sujeito, relação e objeto não podem ser vazios.",
      );
    });

    it("should execute validate method and throw for empty relation", () => {
      expect(() => Triplet.create("subject", "", "object")).toThrow(
        "Triplet inválida: sujeito, relação e objeto não podem ser vazios.",
      );
      expect(() => Triplet.create("subject", "   ", "object")).toThrow(
        "Triplet inválida: sujeito, relação e objeto não podem ser vazios.",
      );
    });

    it("should execute validate method and throw for empty object", () => {
      expect(() => Triplet.create("subject", "relation", "")).toThrow(
        "Triplet inválida: sujeito, relação e objeto não podem ser vazios.",
      );
      expect(() => Triplet.create("subject", "relation", "   ")).toThrow(
        "Triplet inválida: sujeito, relação e objeto não podem ser vazios.",
      );
    });
  });

  describe("Equality (equals / deepEqual)", () => {
    it("should return true for the exact same instance", () => {
      const triplet1 = Triplet.create("sub", "rel", "obj");
      expect(triplet1.equals(triplet1)).toBe(true);
    });

    it("should return true for different instances with the same values", () => {
      const triplet1 = Triplet.create("sub", "rel", "obj");
      const triplet2 = Triplet.create("sub", "rel", "obj");
      expect(triplet1.equals(triplet2)).toBe(true);
    });

    it("should return false for different instances with different subject", () => {
      const triplet1 = Triplet.create("sub1", "rel", "obj");
      const triplet2 = Triplet.create("sub2", "rel", "obj");
      expect(triplet1.equals(triplet2)).toBe(false);
    });

    it("should return false for different instances with different relation", () => {
      const triplet1 = Triplet.create("sub", "rel1", "obj");
      const triplet2 = Triplet.create("sub", "rel2", "obj");
      expect(triplet1.equals(triplet2)).toBe(false);
    });

    it("should return false for different instances with different object", () => {
      const triplet1 = Triplet.create("sub", "rel", "obj1");
      const triplet2 = Triplet.create("sub", "rel", "obj2");
      expect(triplet1.equals(triplet2)).toBe(false);
    });

    it("should return false when comparing with null or undefined", () => {
      const triplet1 = Triplet.create("sub", "rel", "obj");
      expect(triplet1.equals(null as any)).toBe(false);
      expect(triplet1.equals(undefined as any)).toBe(false);
    });
  });
});
