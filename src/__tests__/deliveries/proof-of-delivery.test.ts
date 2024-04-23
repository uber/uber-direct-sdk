import { DeliveriesClient, createDeliveriesClient } from '../../deliveries';
import {
  podReq,
  podResp,
  accessToken,
  customerId,
  deliveryId,
  getExpectedHeaders,
  invalidPODReq,
} from '../../__fixtures__/index';

describe('proofOfDelivery', () => {
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
      json: jest.fn().mockResolvedValueOnce(podResp),
    });

    const pod = await deliveriesClient.proofOfDelivery(deliveryId, podReq);

    expect(global.fetch).toHaveBeenCalledWith(
      `${deliveriesClient.baseURL}/deliveries/${deliveryId}/proof-of-delivery`,
      {
        method: 'POST',
        headers: getExpectedHeaders(accessToken),
        body: JSON.stringify(podReq),
      }
    );
    expect(pod).toEqual(podResp);
  });

  it('should throw an error if response.ok is not true', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      deliveriesClient.proofOfDelivery(deliveryId, podReq)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('should handle errors', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce({
      response: {
        data: {
          code: 'invalid_params',
          message: 'The parameters of your request were invalid.',
          kind: 'error',
          metadata: {
            pickup_address: 'This field is required.',
          },
        },
      },
    });

    await expect(
      deliveriesClient.proofOfDelivery(deliveryId, invalidPODReq)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
