import { components, paths } from '../types/deliveries';

// TODO: Import error types from OpenAPI spec
type Error = {
  code: string;
  message: string;
  kind: string;
  metadata: ErrorMetadata;
};

type ErrorMetadata = {
  param_details: string;
};

type DeliveryQuoteReq = components['schemas']['DeliveryQuoteReq'];
type DeliveryQuoteResp = components['schemas']['DeliveryQuoteResp'];
type DeliveryReq = components['schemas']['DeliveryReq'];
type DeliveryResp = components['schemas']['DeliveryResp'];
type UpdateDeliveryReq = components['schemas']['UpdateDeliveryReq'];
type ListDeliveriesReq = paths['/customers/{customer_id}/deliveries']['get']['parameters']['query'];
type ListDeliveriesResp =
  paths['/customers/{customer_id}/deliveries']['get']['responses']['200']['content']['application/json'];
type PODReq = components['schemas']['PODReq'];
type PODResp = components['schemas']['PODResp'];

export type {
  DeliveryQuoteReq,
  DeliveryQuoteResp,
  DeliveryReq,
  DeliveryResp,
  Error,
  ListDeliveriesReq,
  ListDeliveriesResp,
  PODReq,
  PODResp,
  UpdateDeliveryReq,
};
