import { describe, expect, it } from "bun:test";

import { MESSAGE_ROLES } from "@/core/domain/value-objects/primitives/MessageRole";

//#region TESTS

describe("MessageRole", () => {
  it("should contain the valid roles", () => {
    expect(Object.values(MESSAGE_ROLES)).toContain("user");
    expect(Object.values(MESSAGE_ROLES)).toContain("assistant");
    expect(Object.values(MESSAGE_ROLES)).toContain("system");
  });

  it("should have exactly 3 valid roles", () => {
    expect(Object.keys(MESSAGE_ROLES).length).toBe(3);
  });
});

//#endregion
