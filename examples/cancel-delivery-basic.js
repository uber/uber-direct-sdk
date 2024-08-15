import { getAccessToken, createDeliveriesClient } from 'uber-direct';

(async () => {
  const token = await getAccessToken();
  const deliveriesClient = createDeliveriesClient(token);
  const deliveryId = 'del_pEZlmh05Swev6MIcLqTg1A';
  const delivery = await deliveriesClient.cancelDelivery(deliveryId);
  console.log(`Your delivery status is: ${delivery.status} (Order ID: ${delivery.tracking_url})`);
})();
