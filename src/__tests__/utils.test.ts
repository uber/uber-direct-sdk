import { version } from '../../package.json';
import { FetchError, fetchData, getHeaders, getUserAgent, makeQueryString } from "../utils";

jest.mock('node-fetch', () => jest.fn());

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fetchData', () => {
  it('should make a GET request', async () => {
    // Arrange
    const url = 'https://example.com';
    const method = 'GET';
    const accessToken = 'token';
    const req = undefined;
    const expected = { data: 'response' };
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(expected),
    });

    // Act
    const result = await fetchData(url, method, accessToken, req);

    // Assert
    expect(result).toEqual(expected);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': getUserAgent(),
      },
    });
  });
  it('should make a POST request', async () => {
    // Arrange
    const url = 'https://example.com';
    const method = 'POST';
    const accessToken = 'token';
    const req = { data: 'request' };
    const expected = { data: 'response' };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(expected),
    });

    // Act
    const result = await fetchData(url, method, accessToken, req);

    // Assert
    expect(result).toEqual(expected);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'User-Agent': getUserAgent(),
      },
      body: JSON.stringify(req),
    });
  });
  it('should throw a FetchError when the request fails', async () => {
    // Arrange
    const url = 'https://example.com';
    const method = 'GET';
    const accessToken = 'token';
    const req = undefined;
    const expected = {
      message: 'error',
      code: 'code',
      metadata: { key: 'value' },
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValueOnce(expected),
    });

    // Act
    try {
      await fetchData(url, method, accessToken, req);
    } catch (error) {
      // Cast error to FetchError
      const fetchError = error as FetchError;
      // Assert
      expect(fetchError.message).toBe(expected.message);
      expect(fetchError.status).toBe(500);
      expect(fetchError.code).toBe(expected.code);
      expect(fetchError.metadata).toEqual(expected.metadata);
    }
  });
  it('should throw a regular error in the catch block', async () => {
    // Arrange
    const url = 'https://example.com';
    const method = 'GET';
    const accessToken = 'token';
    const req = undefined;
    const expected = new Error('Failed to fetch data');

    global.fetch = jest.fn().mockRejectedValueOnce(expected);

    // Act
    try {
      await fetchData(url, method, accessToken, req);
    } catch (error) {
      // Assert
      const expectedError = new Error('Error: Failed to fetch data');
      expect(expectedError).toEqual(error);
    }
  });
});

describe('getUserAgent', () => {
  it('should include Uber Direct JS SDK, package version, and node version', () => {
    const userAgent = getUserAgent();
    expect(userAgent).toEqual(
      `Uber Direct JS SDK/${version} (Node.js ${process.version})`
    );
  });
});

describe("getHeaders", () => {
  it("should return the correct headers when passed an access token and GET method", () => {
    const headers = getHeaders("access-token", "GET");
    expect(headers).toEqual({
      Authorization: "Bearer access-token",
      "User-Agent": getUserAgent(),
    });
  });

  it("should return the correct headers when passed an access token and POST method", () => {
    const headers = getHeaders("access-token", "POST");
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
