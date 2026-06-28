import { describe, expect, it } from "bun:test";

import { IngestedDocument } from "@/core/domain/entities/IngestedDocument";

//#region TESTS

describe("IngestedDocument", () => {
  describe("Creation (create)", () => {
    it("should create a valid IngestedDocument with correct properties", () => {
      const text = "This is a sample document text.";
      const source = "/path/to/document.txt";

      const document = IngestedDocument.create(text, source);

      expect(document).toBeInstanceOf(IngestedDocument);
      expect(document.id).toBe(source);
      expect(document.getText()).toBe(text);
      expect(document.getSource()).toBe(source);
      expect(document.getCharCount()).toBe(text.length);
      expect(document.getIngestedAt()).toBeDefined();
      expect(typeof document.getIngestedAt()).toBe("string");

      const date = new Date(document.getIngestedAt());
      expect(date.toISOString()).toBe(document.getIngestedAt());
    });
  });

  describe("Validation", () => {
    it("should execute validate method and not throw for valid text", () => {
      expect(() =>
        IngestedDocument.create("Valid text", "source.txt"),
      ).not.toThrow();
    });

    it("should execute validate method and throw for empty text", () => {
      const source = "empty.txt";
      expect(() => IngestedDocument.create("", source)).toThrow(source);
    });

    it("should execute validate method and throw for text with only whitespaces", () => {
      const source = "whitespaces.txt";
      expect(() => IngestedDocument.create("   \n \t  ", source)).toThrow(
        source,
      );
    });
  });

  describe("Equality (equals)", () => {
    it("should return true for different instances with the same source (id)", () => {
      const source = "/same/path.txt";
      const doc1 = IngestedDocument.create("Text 1", source);
      const doc2 = IngestedDocument.create("Text 2", source);

      expect(doc1.equals(doc2)).toBe(true);
    });

    it("should return false for different instances with different sources (ids)", () => {
      const doc1 = IngestedDocument.create("Text", "/path/1.txt");
      const doc2 = IngestedDocument.create("Text", "/path/2.txt");

      expect(doc1.equals(doc2)).toBe(false);
    });
  });
});

//#endregion
