// TODO: Replace with '@uber-direct'
import { getAccessToken, createDeliveriesClient } from '../../../dist/index.js';

(async () => {
  const token = await getAccessToken();
  const deliveriesClient = createDeliveriesClient(token);
  const deliveryId = 'del_LsdsanlbSYuGz9avuB-wDg';
  const req = {
    tipByCustomer: 1000,
  };

  const delivery = await deliveriesClient.updateDelivery(deliveryId, req);
  console.log(`Your delivery tip is: ${delivery.tip} (Order ID: ${delivery.trackingUrl})`);
})();
