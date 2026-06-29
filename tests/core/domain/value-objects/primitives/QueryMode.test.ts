import { describe, expect, it } from "bun:test";

import { QUERY_MODES } from "@/core/domain/value-objects/primitives/QueryMode";

//#region TESTS

describe("QueryMode", () => {
  it("should contain the valid modes", () => {
    expect(Object.values(QUERY_MODES)).toContain("embedding");
    expect(Object.values(QUERY_MODES)).toContain("keyword");
    expect(Object.values(QUERY_MODES)).toContain("hybrid");
  });

  it("should have exactly 3 valid modes", () => {
    expect(Object.keys(QUERY_MODES).length).toBe(3);
  });
});

//#endregion
