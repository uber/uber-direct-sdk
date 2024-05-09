// TODO: Replace with '@uber-direct'
import { getAccessToken, createDeliveriesClient } from '../../../dist/index.js';

(async () => {
  const token = await getAccessToken();
  const deliveriesClient = createDeliveriesClient(token);
  const deliveryId = 'del_pEZlmh05Swev6MIcLqTg1A';
  const delivery = await deliveriesClient.getDelivery(deliveryId);
  console.log(delivery);
  console.log(`Your delivery status is: ${delivery.status} (Order ID: ${delivery.tracking_url})`);
})();
