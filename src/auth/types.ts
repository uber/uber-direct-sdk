import { components } from '../types/auth';

type LoginReq = components['schemas']['LoginReq'];
type LoginResp = components['schemas']['LoginResp'];

type Credentials = {
  clientId: string;
  clientSecret: string;
};

type SCOPE_DIRECT_ORGANIZATIONS = 'direct.organizations';
type SCOPE_EATS_DELIVERIES = 'eats.deliveries';
type SCOPE_EATS_STORE_ORDERS_CANCEL = 'eats.store.orders.cancel';

type Scope = SCOPE_DIRECT_ORGANIZATIONS | SCOPE_EATS_DELIVERIES;

type GRANT_TYPE_CLIENT_CREDENTIALS = 'client_credentials';

export type {
  LoginReq,
  LoginResp,
  Credentials,
  GRANT_TYPE_CLIENT_CREDENTIALS,
  SCOPE_DIRECT_ORGANIZATIONS,
  SCOPE_EATS_DELIVERIES,
  SCOPE_EATS_STORE_ORDERS_CANCEL,
};
