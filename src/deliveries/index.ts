import type {
  DeliveryQuoteReq,
  DeliveryReq,
  ListDeliveriesReq,
  PODReq,
  UpdateDeliveryReq,
} from './types';
import { fetchData, makeQueryString } from '../utils';

export class DeliveriesClient {
  accessToken: string;
  baseURL: string;
  customerID: string;

  constructor(accessToken: string, customerID?: string) {
    this.accessToken = accessToken;

    const cusID = customerID || process.env.UBER_DIRECT_CUSTOMER_ID;

    if (!cusID) {
      throw new Error(
        'Must include UBER_DIRECT_CUSTOMER_ID in environment variables or pass it in as an argument'
      );
    }
    this.customerID = cusID;
    this.baseURL = `https://api.uber.com/v1/customers/${this.customerID}`;
  }

  async createQuote(req: DeliveryQuoteReq) {
    return fetchData(
      `${this.baseURL}/delivery_quotes`,
      'POST',
      this.accessToken,
      req
    );
  }

  async createDelivery(req: DeliveryReq) {
    return fetchData(
      `${this.baseURL}/deliveries`,
      'POST',
      this.accessToken,
      req
    );
  }

  async getDelivery(deliveryId: string) {
    return fetchData(
      `${this.baseURL}/deliveries/${deliveryId}`,
      'GET',
      this.accessToken
    );
  }

  async listDeliveries(options?: ListDeliveriesReq) {
    let url = `${this.baseURL}/deliveries`;
    if (options) {
      url += makeQueryString(options);
    }
    return fetchData(url, 'GET', this.accessToken);
  }

  async cancelDelivery(deliveryId: string) {
    return fetchData(
      `${this.baseURL}/deliveries/${deliveryId}/cancel`,
      'POST',
      this.accessToken
    );
  }

  async updateDelivery(deliveryId: string, req: UpdateDeliveryReq) {
    return fetchData(
      `${this.baseURL}/deliveries/${deliveryId}`,
      'POST',
      this.accessToken,
      req
    );
  }

  async proofOfDelivery(deliveryId: string, req: PODReq) {
    return fetchData(
      `${this.baseURL}/deliveries/${deliveryId}/proof-of-delivery`,
      'POST',
      this.accessToken,
      req
    );
  }
}

export const createDeliveriesClient = (
  accessToken: string,
  customerID?: string
) => {
  return new DeliveriesClient(accessToken, customerID);
};
