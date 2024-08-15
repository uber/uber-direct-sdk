import { getAccessToken } from 'uber-direct';

(async () => {
  const token = await getAccessToken();
  console.log(`Your access token is: ${token}`);
})();
