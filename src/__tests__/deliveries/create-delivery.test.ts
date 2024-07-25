import { DeliveriesClient, createDeliveriesClient } from '../../deliveries';
import {
  createDeliveryReq,
  createDeliveryReqOptionalFields,
  createDeliveryResp,
  accessToken,
  customerId,
} from '../../__fixtures__/index';
import { getHeaders } from "../../utils";

describe('createDelivery', () => {
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
      json: jest.fn().mockResolvedValueOnce(createDeliveryResp),
    });

    const delivery = await deliveriesClient.createDelivery(createDeliveryReq);
    const method = 'POST';
    expect(global.fetch).toHaveBeenCalledWith(
      `${deliveriesClient.baseURL}/deliveries`,
      {
        method,
        headers: getHeaders(accessToken, method),
        body: JSON.stringify(createDeliveryReq),
      }
    );
    expect(delivery).toEqual(createDeliveryResp);
  });

  it('should make a POST request with the optional parameters', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(createDeliveryResp),
    });

    const req = { ...createDeliveryReq, ...createDeliveryReqOptionalFields };
    const delivery = await deliveriesClient.createDelivery(req);

    const method = 'POST';
    expect(global.fetch).toHaveBeenCalledWith(
      `${deliveriesClient.baseURL}/deliveries`,
      {
        method,
        headers: getHeaders(accessToken, method),
        body: JSON.stringify(req),
      }
    );
    expect(delivery).toEqual(createDeliveryResp);
  });

  it.todo('should make a request with a structured address');

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
      deliveriesClient.createDelivery(createDeliveryReq)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
