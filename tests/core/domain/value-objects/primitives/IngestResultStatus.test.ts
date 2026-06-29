import { describe, expect, it } from "bun:test";

import { INGEST_RESULT_STATUS } from "@/core/domain/value-objects/primitives/IngestResultStatus";

//#region TESTS

describe("IngestResultStatus", () => {
  it("should contain the valid status", () => {
    expect(Object.values(INGEST_RESULT_STATUS)).toContain("ok");
    expect(Object.values(INGEST_RESULT_STATUS)).toContain("skipped");
    expect(Object.values(INGEST_RESULT_STATUS)).toContain("error");
  });

  it("should have exactly 3 valid statuses", () => {
    expect(Object.keys(INGEST_RESULT_STATUS).length).toBe(3);
  });
});

//#endregion
