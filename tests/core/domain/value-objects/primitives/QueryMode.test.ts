import { describe, expect, it } from "bun:test";

import { QUERY_MODES } from "@/core/domain/value-objects/primitives/QueryMode";

//#region TESTS

describe("QueryMode", () => {
  it("should contain the valid modes", () => {
    expect(QUERY_MODES).toContain("embedding");
    expect(QUERY_MODES).toContain("keyword");
    expect(QUERY_MODES).toContain("hybrid");
  });

  it("should have exactly 3 valid modes", () => {
    expect(QUERY_MODES.length).toBe(3);
  });
});

//#endregion
