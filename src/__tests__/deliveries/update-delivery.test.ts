import { DeliveriesClient, createDeliveriesClient } from '../../deliveries';
import {
  deliveryId,
  updateDeliveryReq,
  updateDeliveryResp,
  accessToken,
  customerId,
} from '../../__fixtures__/index';
import { getHeaders } from '../../utils';

describe('updateDelivery', () => {
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
      json: jest.fn().mockResolvedValueOnce(updateDeliveryResp),
    });

    const updatedDelivery = await deliveriesClient.updateDelivery(deliveryId, {
      ...updateDeliveryReq,
    });
    const method = 'POST';
    expect(global.fetch).toHaveBeenCalledWith(
      `${deliveriesClient.baseURL}/deliveries/${deliveryId}`,
      {
        method,
        headers: getHeaders(accessToken, method),
        body: JSON.stringify(updateDeliveryReq),
      }
    );
    expect(updatedDelivery).toEqual(updateDeliveryResp);
  });

  it('should handle errors', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce({
      response: {
        data: {
          code: 'tip_already_recorded_error	',
          message: 'Tip already applied to delivery.',
          kind: 'error',
        },
      },
    });

    await expect(
      deliveriesClient.updateDelivery(deliveryId, updateDeliveryReq)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
