import { FetchError, fetchData } from '../utils';

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
        'Content-Type': 'application/json',
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
