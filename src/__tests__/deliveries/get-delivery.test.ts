import { DeliveriesClient, createDeliveriesClient } from '../../deliveries';
import {
  createDeliveryResp,
  deliveryId,
  accessToken,
  customerId,
  getExpectedHeaders,
} from '../../__fixtures__/index';

describe('getDelivery', () => {
  let deliveriesClient: DeliveriesClient;
  beforeEach(() => {
    jest.resetModules();

    process.env.UBER_DIRECT_CUSTOMER_ID = customerId;
    deliveriesClient = createDeliveriesClient(accessToken);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should make a GET request with the required parameters', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(createDeliveryResp),
    });

    const delivery = await deliveriesClient.getDelivery(deliveryId);

    expect(global.fetch).toHaveBeenCalledWith(
      `${deliveriesClient.baseURL}/deliveries/${deliveryId}`,
      {
        method: 'GET',
        headers: getExpectedHeaders(accessToken),
      }
    );
    expect(delivery).toEqual(createDeliveryResp);
  });

  it('should handle errors', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce({
      response: {
        data: {
          code: 'delivery_not_found',
          message: 'The requested delivery does not exist.',
          kind: 'error',
        },
      },
    });

    await expect(deliveriesClient.getDelivery(deliveryId)).rejects.toThrowErrorMatchingSnapshot();
  });
});
