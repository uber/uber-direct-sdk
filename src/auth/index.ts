import type { LoginReq, LoginResp } from './types';

export async function getAccessToken(): Promise<string> {
  const clientId = process.env.UBER_DIRECT_CLIENT_ID;
  const clientSecret = process.env.UBER_DIRECT_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error(
      'Must include UBER_DIRECT_CLIENT_ID and UBER_DIRECT_CLIENT_SECRET in environment variables'
    );
  }

  const body: LoginReq = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
    scope: ['direct.organizations', 'eats.deliveries'].join(' '),
  };

  try {
    const response = await fetch('https://login.uber.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(body as Record<string, string>).toString(),
    });

    if (response.ok) {
      const data: LoginResp = await response.json();
      return data.access_token as string;
    } else {
      const error = await response.text();
      throw new Error(`Failed to fetch access token: ${error}`);
    }
  } catch (err) {
    // TODO: Handle errors better
    console.log(err);
    throw err;
  }
}
