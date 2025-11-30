import type { CreateOrgReq } from './types';
import type { InviteMemberReq } from './types';
import { fetchData } from '../utils';
import { getBaseURL, type ClientOptions } from '../config';

export class OrganizationsClient {
  accessToken: string;
  baseURL: string;

  constructor(accessToken: string, options?: ClientOptions) {
    this.accessToken = accessToken;
    const baseURL = getBaseURL(options?.environment);
    this.baseURL = `${baseURL}/v1/direct`;
  }

  async createOrganization(req: CreateOrgReq) {
    return fetchData(`${this.baseURL}/organizations`, 'POST', this.accessToken, req);
  }

  async inviteMember(organizationId: string, req: InviteMemberReq) {
    return fetchData(`${this.baseURL}/organizations/${organizationId}/memberships/invite`, 'POST', this.accessToken, req);
  }

  async getOrganization(organizationId: string) {
    return fetchData(`${this.baseURL}/organizations/${organizationId}`, 'GET', this.accessToken);
  }


}

export const createOrganizationsClient = (
  accessToken: string,
  options?: ClientOptions
) => {
  return new OrganizationsClient(accessToken, options);
};
