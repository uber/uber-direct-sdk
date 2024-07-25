import { getUserAgent, makeQueryString } from "../../utils";
import { getExpectedHeaders } from "../../__fixtures__/index";

describe("getHeaders", () => {
  it("should return the correct headers when passed an access token and GET method", () => {
    const headers = getExpectedHeaders("access-token", "GET");
    expect(headers).toEqual({
      Authorization: "Bearer access-token",
      'User-Agent': getUserAgent(),
    });
  });

  it("should return the correct headers when passed an access token and POST method", () => {
    const headers = getExpectedHeaders("access-token", "POST");
    expect(headers).toEqual({
      Authorization: "Bearer access-token",
      "Content-Type": "application/json",
      "User-Agent": getUserAgent(),
    });
  });
});

describe("makeQueryString", () => {
  it("should return the correct query string when passed an object", () => {
    const queryString = makeQueryString({ key: "value" });
    expect(queryString).toEqual("?key=value");
  });
});
