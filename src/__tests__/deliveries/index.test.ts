import { createDeliveriesClient } from '../../deliveries';
import { accessToken, customerId } from '../../__fixtures__/index';

describe('DeliveriesClient', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('success - should return an instance of DeliveriesClient if UBER_DIRECT_CUSTOMER_ID is set as an env variable', () => {
    process.env.UBER_DIRECT_CUSTOMER_ID = customerId;
    const deliveriesClient = createDeliveriesClient(accessToken);

    expect(deliveriesClient).toBeDefined();
    expect(deliveriesClient.accessToken).toEqual(accessToken);
    expect(deliveriesClient.customerID).toEqual(customerId);
    expect(deliveriesClient.baseURL).toEqual(
      `https://api.uber.com/v1/customers/${customerId}`
    );
  });

  it('success - should return an instance of DeliveriesClient if customerID is passed in', () => {
    const deliveriesClient = createDeliveriesClient(accessToken, customerId);

    expect(deliveriesClient).toBeDefined();
    expect(deliveriesClient.accessToken).toEqual(accessToken);
    expect(deliveriesClient.customerID).toEqual(customerId);
    expect(deliveriesClient.baseURL).toEqual(
      `https://api.uber.com/v1/customers/${customerId}`
    );
  });
});
