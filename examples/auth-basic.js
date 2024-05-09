// TODO: Replace with '@uber-direct/auth'
import { getAccessToken } from '../../dist/index.js';

(async () => {
  const token = await getAccessToken();
  console.log(`Your access token is: ${token}`);
})();
