// TODO: Replace with '@uber-direct'
import { getAccessToken, createDeliveriesClient } from '../../../dist/index.js';

(async () => {
  const token = await getAccessToken();
  const deliveriesClient = createDeliveriesClient(token);

  const quoteReq = {
    pickup_address: JSON.stringify({
      street_address: ['425 Market St'],
      city: 'San Francisco',
      state: 'CA',
      zip_code: '94105',
      country: 'US',
    }),
    dropoff_address: JSON.stringify({
      street_address: ['201 3rd St'],
      city: 'San Francisco',
      state: 'CA',
      zip_code: '94103',
      country: 'US',
    }),
  };

  const quote = await deliveriesClient.createQuote(quoteReq);
  console.log(`Your delivery quote ID is: ${quote.id}`);
})();
