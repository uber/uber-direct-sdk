import type {
  DeliveryQuoteReq,
  DeliveryQuoteResp,
  DeliveryReq,
  DeliveryResp,
  ListDeliveriesReq,
  ListDeliveriesResp,
  UpdateDeliveryReq,
  PODReq,
  PODResp,
} from '../deliveries/types';
import type {
  BillingType,
  MerchantType,
  OnboardingInviteType,
} from "../organizations/types";

import type { CreateOrgResp, InviteMemberReq, InviteMemberResp } from '../organizations/types';

export const accessToken = 'ACCESS_TOKEN';
export const customerId = 'CUSTOMER_ID';

export const verification = {
  signature_requirement: {
    enabled: true,
    collect_signer_name: true,
    collect_signer_relationship: true,
  },
  barcodes: [
    {
      type: 'CODE39' as const,
      value: 'https://www.uber.com',
    },
  ],
  pincode: {
    enabled: true,
    value: '1234',
  },
  package: {
    bag_count: 1,
    drink_count: 0,
  },
  identification: {
    min_age: 21,
  },
  picture: false,
};
export const createDeliveryQuoteReq: DeliveryQuoteReq = {
  pickup_address: JSON.stringify({
    street_address: ['425 Market St'],
    city: 'San Francisco',
    state: 'CA',
    zip_code: '94105',
    country: 'US',
  }),
  dropoff_address: JSON.stringify({
    street_address: ['201 3rd St'],
    city: 'San Francisco',
    state: 'CA',
    zip_code: '94103',
    country: 'US',
  }),
};
export const createDeliveryQuoteReqUnstructured: DeliveryQuoteReq = {
  pickup_address: '425 Market St, San Francisco, CA 94105',
  dropoff_address: '201 3rd St, San Francisco, CA 94103',
};
export const createDeliveryQuoteReqOptionalFields = {
  dropoff_latitude: 37.785834,
  dropoff_longitude: -122.406417,
  dropoff_phone_number: '+14155552671',
  pickup_latitude: 37.776619,
  pickup_longitude: -122.417385,
  pickup_phone_number: '+14155552671',
  pickup_ready_dt: '2023-01-01T00:00:00.000Z',
  pickup_deadline_dt: '2023-01-01T00:00:00.000Z',
  dropoff_ready_dt: '2023-01-01T00:00:00.000Z',
  dropoff_deadline_dt: '2023-01-01T00:00:00.000Z',
  manifest_total_value: 100,
  external_store_id: 'Store123',
};

// @ts-ignore Purposely missing a field for the test
export const invalidCreateDeliveryQuoteReq: DeliveryQuoteReq = {
  dropoff_address: '1515 3rd St, San Francisco, CA 94158',
};

export const createDeliveryQuoteResp: DeliveryQuoteResp = {
  created: '2023-01-01T00:00:00.000Z',
  currency_type: 'usd',
  dropoff_deadline: '2023-01-01T00:00:00.000Z',
  dropoff_eta: '2023-01-01T00:00:00.000Z',
  duration: 15,
  expires: '2023-01-01T00:00:00.000Z',
  fee: 600,
  id: 'dqt_pqFB4BHhQO2iqIXvS50i5g',
  kind: 'delivery_quote',
  pickup_duration: 10,
};

export const createDeliveryReq: DeliveryReq = {
  pickup_name: 'Uber HQ',
  pickup_address: '425 Market St, San Francisco, CA 94105',
  pickup_phone_number: '+14155552671',
  dropoff_name: 'Uber HQ',
  dropoff_address: '201 3rd St, San Francisco, CA 94103',
  dropoff_phone_number: '+14155552671',
  manifest_items: [
    {
      name: 'Thing 1',
      quantity: 1,
      size: 'small',
      price: 1000,
      dimensions: {
        length: 20,
        height: 7,
        depth: 15,
      },
      must_be_upright: false,
    },
  ],
};

export const createDeliveryReqOptionalFields = {
  dropoff_business_name: 'Uber HQ',
  dropoff_deadline_dt: '2023-01-01T00:00:00.000Z',
  dropoff_latitude: 37.785834,
  dropoff_longitude: -122.406417,
  dropoff_notes: 'Leave at front desk',
  dropoff_ready_dt: '2023-01-01T00:00:00.000Z',
  dropoff_verification: verification,
  external_id: 'ext_123',
  external_store_id: 'Store123',
  idempotency_key: 'idempotency_key',
  manifest_reference: 'manifest_reference',
  manifest_total_value: 100,
  pickup_business_name: 'Uber HQ',
  pickup_deadline_dt: '2023-01-01T00:00:00.000Z',
  pickup_latitude: 37.776619,
  pickup_longitude: -122.417385,
  pickup_notes: 'Call when you arrive',
  pickup_ready_dt: '2023-01-01T00:00:00.000Z',
  pickup_verification: verification,
  quote_id: 'dqt_pqFB4BHhQO2iqIXvS50i5g',
  requires_dropoff_signature: true,
  requires_id: true,
  return_verification: verification,
  tip: 500,
  undeliverable_action: 'leave_at_door' as const,
};

export const deliveryId = 'del_v5Fa7dJfRz-oInZLWGCvlQ';
export const createDeliveryResp: DeliveryResp = {
  complete: false,
  courier_imminent: false,
  created: '2023-01-01T00:00:00.000Z',
  currency: 'usd',
  dropoff: {
    name: 'Uber HQ',
    phone_number: '+14155552671',
    address: '201 3rd St, San Francisco, CA 94103',
    detailed_address: {
      city: 'San Francisco',
      country: 'US',
      street_address_1: '201 3rd St',
      street_address_2: 'Floor 6',
      zip_code: '94103',
      state: 'CA',
    },
    notes: 'Call when you arrive',
    seller_notes: 'Call when you arrive',
    courier_notes: 'Call when you arrive',
    external_store_id: 'Store123',
    location: {
      lat: 37.776619,
      lng: -122.417385,
    },
  },
  dropoff_deadline: '2023-01-01T00:00:00.000Z',
  dropoff_eta: '2023-01-01T00:00:00.000Z',
  dropoff_identifier: 'dropoff_123',
  dropoff_ready: '2023-01-01T00:00:00.000Z',
  external_id: 'ext_123',
  fee: 600,
  id: deliveryId,
  kind: 'delivery',
  live_mode: true,
  manifest_items: {
    name: 'item1',
    quantity: 1,
    size: 'small',
    price: 10,
    dimensions: { length: 10, height: 10, depth: 10 },
    must_be_upright: false,
    weight: 1,
  },
  pickup: {
    name: 'Uber HQ',
    phone_number: '+14155552671',
    address: '425 Market St, San Francisco, CA 94105',
    detailed_address: {
      city: 'San Francisco',
      country: 'US',
      street_address_1: '425 Market St',
      street_address_2: 'Floor 8',
      zip_code: '94105',
      state: 'CA',
    },
    notes: 'Call when you arrive',
    seller_notes: 'Call when you arrive',
    courier_notes: 'Call when you arrive',
    external_store_id: 'Store123',
    location: {
      lat: 37.776619,
      lng: -122.417385,
    },
  },
  pickup_deadline: '2023-01-01T00:00:00.000Z',
  pickup_eta: '2023-01-01T00:00:00.000Z',
  pickup_ready: '2023-01-01T00:00:00.000Z',
  quote_id: 'dqt_pqFB4BHhQO2iqIXvS50i5g',
  related_deliveries: {
    id: 'del_v5Fa7dJfRz-oInZLWGCvlQ',
    relationship: 'original',
  },
  return: {
    name: 'Uber HQ',
    phone_number: '+14155552671',
    address: '425 Market St, San Francisco, CA 94105',
    detailed_address: {
      city: 'San Francisco',
      country: 'US',
      street_address_1: '425 Market St',
      street_address_2: 'Floor 8',
      zip_code: '94105',
      state: 'CA',
    },
    notes: 'Call when you arrive',
    seller_notes: 'Call when you arrive',
    courier_notes: 'Call when you arrive',
    external_store_id: 'Store123',
    location: {
      lat: 37.776619,
      lng: -122.417385,
    },
  },
  status: 'pending',
  tip: 0,
  tracking_url: 'https://ubereats.com/orders/2e94-4c4c-9c9c-2e94c4c9c9c2',
  undeliverable_action: 'left_at_door',
  undeliverable_reason: 'unreachable',
  updated: '2023-01-01T00:00:00.000Z',
  uuid: '2e94-4c4c-9c9c-2e94c4c9c9c2',
};

export const cancelDeliveryResp = {
  ...createDeliveryResp,
  status: 'canceled',
};

export const updateDeliveryReq: UpdateDeliveryReq = {
  dropoff_notes: 'Call when you arrive',
  dropoff_verification: verification,
  manifest_reference: 'manifest_reference',
  pickup_notes: 'Call when you arrive',
  pickup_verification: verification,
  requires_dropoff_signature: true,
  requires_id: true,
  tip_by_customer: 500,
  dropoff_latitude: 37.776619,
  dropoff_longitude: -122.417385,
};

export const updateDeliveryResp = {
  ...createDeliveryResp,
  tip: 500,
};

export const listDeliveriesReq: ListDeliveriesReq = {
  filter: 'pending',
  limit: 1,
  // FIXME: Lowercase offset
  Offset: 1,
};

export const listDeliveriesResp: ListDeliveriesResp = {
  data: [createDeliveryResp],
  total_count: 1,
  next_href: `https://api.uber.com/v1/customers/${customerId}/deliveries/${deliveryId}?offset=1&limit=1`,
};

//Organization Fixtures
//Later move to seperate file
export const organizationId = 'acdbc973-0e50-40ef-8797-01ef6e8cc339';
export const createOrgResp: CreateOrgResp = {
  organization_id: 'acdbc973-0e50-40ef-8797-01ef6e8cc339',
  info: {
    name: 'Franchise 1 - Decentalized',
    merchant_type: 'MERCHANT_TYPE_RESTAURANT',
    point_of_contact: {
      email: 'user@gmail.com',
    },
    billing_type: 'BILLING_TYPE_CENTRALIZED',
    address: {
      country_iso2: 'US',
    },
  },
  hierarchy_info: {
    parent_organization_id: '15593a69-a9ba-5467-ba2e-a656c915becc',
  },
};

export const inviteMemberReq: InviteMemberReq = {
  user_details: {
    email: 'user@gmail.com',
    first_name: 'Admin',
    last_name: 'Account',
    phone_details: {
      phone_number: '15555555555',
      country_code: '1',
      subscriber_number: '5555555555',
    },
  },
  roles: ['ROLE_ADMIN'],
};

export const inviteMemberResp: InviteMemberResp = {
  membership_id: '57829d64-2633-402b-9f9c-c70900d2b4df',
  organization_id: 'acdbc973-0e50-40ef-8797-01ef6e8cc339',
  user_details: {
    email: 'user@gmail.com',
    first_name: 'Admin',
    last_name: 'Account',
    phone_details: {
      country_code: '1',
      subscriber_number: '5555555555',
    },
  },
  roles: ['ROLE_ADMIN'],
};

export const podReq: PODReq = {
  waypoint: 'pickup',
  type: 'picture',
};

export const podResp: PODResp = {
  document: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEU...',
};

// @ts-ignore Purposely missing a field for the test
export const invalidPODReq: PODReq = {
  waypoint: 'pickup',
};

export const getCreateOrgReq = (
  billingType: BillingType = "BILLING_TYPE_CENTRALIZED",
  merchantType: MerchantType = "MERCHANT_TYPE_RESTAURANT",
  address: object = {
    street1: "175 Greenwich Ave",
    city: "New York",
    state: "NY",
    zipcode: "10014",
    country_iso2: "US",
  },
  parentOrganizationId: string = "4fe73ff8-0c9a-5ca3-aa2f-17ef3a8487d5"
) => ({
  info: {
    name: "Test Organization",
    billing_type: billingType,
    merchant_type: merchantType,
    address,
  },
  hierarchy_info: {
    parent_organization_id: parentOrganizationId,
  },
  options: {
    onboarding_invite_type:
      "ONBOARDING_INVITE_TYPE_EMAIL" as OnboardingInviteType,
  },
});
