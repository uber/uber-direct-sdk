import { DeliveriesClient, createDeliveriesClient } from '../../deliveries';
import {
  listDeliveriesResp,
  listDeliveriesReq,
  accessToken,
  customerId,
} from '../../__fixtures__/index';
import { getHeaders } from '../../utils';

describe('listDeliveries', () => {
  let deliveriesClient: DeliveriesClient;
  beforeEach(() => {
    jest.resetModules();

    process.env.UBER_DIRECT_CUSTOMER_ID = customerId;
    deliveriesClient = createDeliveriesClient(accessToken);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should make a GET request with the no parameters', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(listDeliveriesResp),
    });

    const resp = await deliveriesClient.listDeliveries();
    const method = 'GET';
    expect(global.fetch).toHaveBeenCalledWith(
      `${deliveriesClient.baseURL}/deliveries`,
      {
        method,
        headers: getHeaders(accessToken, method),
        body: undefined,
      }
    );

    expect(resp).toEqual(listDeliveriesResp);
  });

  it('should make a GET request with the optional parameters', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(listDeliveriesResp),
    });

    const resp = await deliveriesClient.listDeliveries(listDeliveriesReq);
    const method = 'GET';
    expect(global.fetch).toHaveBeenCalledWith(
      `${deliveriesClient.baseURL}/deliveries?filter=pending&limit=1&Offset=1`,
      {
        method,
        headers: getHeaders(accessToken, method),
      }
    );

    expect(resp).toEqual(listDeliveriesResp);
  });

  it('should handle errors', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce({
      response: {
        data: {
          code: 'service_unavailable',
          message: 'Service is currently unavailable.',
          kind: 'error',
        },
      },
    });

    await expect(deliveriesClient.listDeliveries()).rejects.toThrowErrorMatchingSnapshot();
  });
});
