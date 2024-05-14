// TODO: Replace with '@uber-direct'
import { getAccessToken, createDeliveriesClient } from '../../../dist/index.js';

(async () => {
  const token = await getAccessToken();
  const deliveriesClient = createDeliveriesClient(token);
  const options = {
    limit: 3,
  };
  const response = await deliveriesClient.listDeliveries(options);
  if (response.data.length > 0) {
    for (const delivery of response.data) {
      console.log(`Delivery ID: ${delivery.id}`);
    }
  }
})();
