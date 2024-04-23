import { createDeliveriesClient } from '../../deliveries';
import { accessToken, customerId } from '../../__fixtures__/index';

describe('DeliveriesClient', () => {
  beforeEach(() => {
    jest.resetModules();

    process.env.UBER_DIRECT_CUSTOMER_ID = customerId;
  });

  it('should throw an error when UBER_DIRECT_CUSTOMER_ID is not set', () => {
    process.env.UBER_DIRECT_CUSTOMER_ID = '';

    expect(() => createDeliveriesClient(accessToken)).toThrow(
      'Must include UBER_DIRECT_CUSTOMER_ID in environment variables'
    );
  });

  it('should return an instance of DeliveriesClient', () => {
    const deliveriesClient = createDeliveriesClient(accessToken);

    expect(deliveriesClient).toBeDefined();
  });
});
