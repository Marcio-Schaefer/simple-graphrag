import { describe, expect, it } from "bun:test";

import { SUPPORTED_FILES } from "@/core/domain/value-objects/primitives/SupportedFile";

//#region TESTS

describe("SupportedFile", () => {
  it("should contain the valid files", () => {
    expect(Object.values(SUPPORTED_FILES)).toContain(".md");
    expect(Object.values(SUPPORTED_FILES)).toContain(".txt");
    expect(Object.values(SUPPORTED_FILES)).toContain(".pdf");
    expect(Object.values(SUPPORTED_FILES)).toContain(".docx");
  });

  it("should have exactly 4 valid files", () => {
    expect(Object.keys(SUPPORTED_FILES).length).toBe(4);
  });
});

//#endregion
