import { b64_to_utf8, utf8_to_b64 } from "./base64";

describe("Base 64 Helpers", () => {
  describe("utf8_to_b64", () => {
    it("should correctly convert utf8 string to base64", () => {
      const result = utf8_to_b64(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
      );

      expect(result).toBe(
        "QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejEyMzQ1Njc4OTAhJTIyJTIzJTI0JTI1JTI2JygpKiUyQiUyQy0uJTJGJTNBJTNCJTNDJTNEJTNFJTNGJTQwJTVCJTVDJTVEJTVFXyU2MCU3QiU3QyU3RH4="
      );
    });
  });

  describe("b64_to_utf8", () => {
    it("should correctly convert base64 to UTF8", () => {
      const result = b64_to_utf8(
        "QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejEyMzQ1Njc4OTAhJTIyJTIzJTI0JTI1JTI2JygpKiUyQiUyQy0uJTJGJTNBJTNCJTNDJTNEJTNFJTNGJTQwJTVCJTVDJTVEJTVFXyU2MCU3QiU3QyU3RH4="
      );

      expect(result).toBe(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
      );
    });
  });
});
