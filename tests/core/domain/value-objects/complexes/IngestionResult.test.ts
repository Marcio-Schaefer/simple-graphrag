import { describe, expect, it } from "bun:test";

import { IngestionResult } from "@/core/domain/value-objects/complexes/IngestionResult";
import { INGEST_RESULT_STATUS } from "@/core/domain/value-objects/primitives/IngestResultStatus";

describe("IngestionResult", () => {
  describe("Immutability (deepFreeze)", () => {
    it("should freeze object with partial properties", () => {
      const result = IngestionResult.create(
        "file.txt",
        INGEST_RESULT_STATUS.OK,
      );
      expect(Object.isFrozen(result)).toBe(true);
    });
    it("should freeze object with complete properties", () => {
      const result = IngestionResult.create(
        "file.txt",
        INGEST_RESULT_STATUS.OK,
        "reason",
      );
      expect(Object.isFrozen(result)).toBe(true);
    });
  });

  describe("Validation", () => {
    it("should execute validate method and not throw for valid state", () => {
      expect(() =>
        IngestionResult.create("file.txt", INGEST_RESULT_STATUS.OK),
      ).not.toThrow();
      expect(() =>
        IngestionResult.create(
          "file.txt",
          INGEST_RESULT_STATUS.SKIPPED,
          "no changes",
        ),
      ).not.toThrow();
      expect(() =>
        IngestionResult.create(
          "file.txt",
          INGEST_RESULT_STATUS.ERROR,
          "error reason",
        ),
      ).not.toThrow();
    });

    it("should trim spaces from file", () => {
      const result = IngestionResult.create(
        "  file.txt  ",
        INGEST_RESULT_STATUS.OK,
      );
      expect(result.getFile()).toBe("file.txt");
      expect(result.getStatus()).toBe(INGEST_RESULT_STATUS.OK);
      expect(result.getReason()).toBeUndefined();
    });

    it("should return correct values from getters", () => {
      const result = IngestionResult.create(
        "file.txt",
        INGEST_RESULT_STATUS.ERROR,
        "error reason",
      );
      expect(result.getFile()).toBe("file.txt");
      expect(result.getStatus()).toBe(INGEST_RESULT_STATUS.ERROR);
      expect(result.getReason()).toBe("error reason");
    });

    it("should execute validate method and throw for empty file", () => {
      expect(() => IngestionResult.create("", INGEST_RESULT_STATUS.OK)).toThrow(
        "IngestionResult inválido: file não pode ser vazio.",
      );
      expect(() =>
        IngestionResult.create("   ", INGEST_RESULT_STATUS.OK),
      ).toThrow("IngestionResult inválido: file não pode ser vazio.");
    });
  });

  describe("Equality (equals / deepEqual)", () => {
    it("should return true for the exact same instance", () => {
      const result1 = IngestionResult.create(
        "file.txt",
        INGEST_RESULT_STATUS.OK,
      );
      expect(result1.equals(result1)).toBe(true);
    });

    it("should return true for different instances with the same values", () => {
      const result1 = IngestionResult.create(
        "file.txt",
        INGEST_RESULT_STATUS.OK,
        "reason",
      );
      const result2 = IngestionResult.create(
        "file.txt",
        INGEST_RESULT_STATUS.OK,
        "reason",
      );
      expect(result1.equals(result2)).toBe(true);
    });

    it("should return false for different instances with different file", () => {
      const result1 = IngestionResult.create(
        "file1.txt",
        INGEST_RESULT_STATUS.OK,
      );
      const result2 = IngestionResult.create(
        "file2.txt",
        INGEST_RESULT_STATUS.OK,
      );
      expect(result1.equals(result2)).toBe(false);
    });

    it("should return false for different instances with different status", () => {
      const result1 = IngestionResult.create(
        "file.txt",
        INGEST_RESULT_STATUS.OK,
      );
      const result2 = IngestionResult.create(
        "file.txt",
        INGEST_RESULT_STATUS.SKIPPED,
      );
      expect(result1.equals(result2)).toBe(false);
    });

    it("should return false for different instances with different reason", () => {
      const result1 = IngestionResult.create(
        "file.txt",
        INGEST_RESULT_STATUS.ERROR,
        "reason 1",
      );
      const result2 = IngestionResult.create(
        "file.txt",
        INGEST_RESULT_STATUS.ERROR,
        "reason 2",
      );
      expect(result1.equals(result2)).toBe(false);

      const result3 = IngestionResult.create(
        "file.txt",
        INGEST_RESULT_STATUS.ERROR,
      );
      expect(result1.equals(result3)).toBe(false);
    });

    it("should return false when comparing with null or undefined", () => {
      const result1 = IngestionResult.create(
        "file.txt",
        INGEST_RESULT_STATUS.OK,
      );
      expect(result1.equals(null as any)).toBe(false);
      expect(result1.equals(undefined as any)).toBe(false);
    });
  });
});
