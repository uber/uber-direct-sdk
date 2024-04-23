import { getAccessToken } from '../../auth';
import { accessToken } from '../../__fixtures__';

describe('AuthClient', () => {
  const clientId = 'client-id';
  const clientSecret = 'client-secret';
  const scopes = ['direct.organizations', 'eats.deliveries'];

  beforeEach(() => {
    jest.resetModules();
    process.env.UBER_DIRECT_CLIENT_ID = clientId;
    process.env.UBER_DIRECT_CLIENT_SECRET = clientSecret;
  });

  it('should throw an error when env variables are not set', async () => {
    process.env.UBER_DIRECT_CLIENT_ID = '';
    process.env.UBER_DIRECT_CLIENT_SECRET = '';

    await expect(getAccessToken()).rejects.toThrow(
      'Must include UBER_DIRECT_CLIENT_ID and UBER_DIRECT_CLIENT_SECRET in environment variables'
    );
  });

  it('should return the access token', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({
        access_token: accessToken,
      }),
    });

    const result = await getAccessToken();

    expect(result).toEqual(accessToken);
    expect(global.fetch).toHaveBeenCalledWith('https://login.uber.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
        scope: scopes.join(' '),
      }).toString(),
    });
  });

  it('should throw an error when response.ok is not true', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      text: jest.fn().mockResolvedValueOnce('error'),
    });

    await expect(getAccessToken()).rejects.toThrow('Failed to fetch access token: error');
  });
});
