import { DeliveriesClient, createDeliveriesClient } from '../../deliveries';
import {
  deliveryId,
  cancelDeliveryResp,
  accessToken,
  customerId,
} from '../../__fixtures__/index';
import { getHeaders } from '../../utils';

describe('cancelDelivery', () => {
  let deliveriesClient: DeliveriesClient;
  beforeEach(() => {
    jest.resetModules();

    process.env.UBER_DIRECT_CUSTOMER_ID = customerId;
    deliveriesClient = createDeliveriesClient(accessToken);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should make a POST request with the required parameters', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(cancelDeliveryResp),
    });

    const canceledDelivery = await deliveriesClient.cancelDelivery(deliveryId);
    const method = 'POST';
    expect(global.fetch).toHaveBeenCalledWith(
      `${deliveriesClient.baseURL}/deliveries/${deliveryId}/cancel`,
      {
        method,
        headers: getHeaders(accessToken, method),
      }
    );
    expect(canceledDelivery).toEqual(cancelDeliveryResp);
  });

  it('should handle errors', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce({
      response: {
        data: {
          code: 'noncancelable_delivery',
          message: 'Delivery cannot be cancelled.',
          kind: 'error',
        },
      },
    });

    await expect(
      deliveriesClient.cancelDelivery(deliveryId)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
