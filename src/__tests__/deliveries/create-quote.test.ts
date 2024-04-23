import { DeliveriesClient, createDeliveriesClient } from '../../deliveries';
import {
  createDeliveryQuoteReq,
  createDeliveryQuoteReqUnstructured,
  createDeliveryQuoteReqOptionalFields,
  createDeliveryQuoteResp,
  invalidCreateDeliveryQuoteReq,
  accessToken,
  customerId,
  getExpectedHeaders,
} from '../../__fixtures__/index';

describe('createQuote', () => {
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
      json: jest.fn().mockResolvedValueOnce(createDeliveryQuoteResp),
    });

    const deliveryQuote = await deliveriesClient.createQuote(createDeliveryQuoteReq);

    expect(global.fetch).toHaveBeenCalledWith(
      `${deliveriesClient.baseURL}/delivery_quotes`,
      {
        method: 'POST',
        headers: getExpectedHeaders(accessToken),
        body: JSON.stringify(createDeliveryQuoteReq),
      }
    );
    expect(deliveryQuote).toEqual(createDeliveryQuoteResp);
  });

  it('should make a POST request with the unstructured address format', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(createDeliveryQuoteResp),
    });

    const deliveryQuote = await deliveriesClient.createQuote(createDeliveryQuoteReqUnstructured);

    expect(global.fetch).toHaveBeenCalledWith(
      `${deliveriesClient.baseURL}/delivery_quotes`,
      {
        method: 'POST',
        headers: getExpectedHeaders(accessToken),
        body: JSON.stringify(createDeliveryQuoteReqUnstructured),
      }
    );
    expect(deliveryQuote).toEqual(createDeliveryQuoteResp);
  });

  it('should make a POST request with the optional parameters', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(createDeliveryQuoteResp),
    });

    const deliveryQuote = await deliveriesClient.createQuote({
      ...createDeliveryQuoteReq,
      ...createDeliveryQuoteReqOptionalFields,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${deliveriesClient.baseURL}/delivery_quotes`,
      {
        method: 'POST',
        headers: getExpectedHeaders(accessToken),
        body: JSON.stringify({
          ...createDeliveryQuoteReq,
          ...createDeliveryQuoteReqOptionalFields,
        }),
      }
    );
    expect(deliveryQuote).toEqual(createDeliveryQuoteResp);
  });

  it('should throw an error if response.ok is not true', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      deliveriesClient.createQuote(createDeliveryQuoteReq)
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
      deliveriesClient.createQuote(invalidCreateDeliveryQuoteReq)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
