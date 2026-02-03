import type { CreateOrgResp, CreateOrgReq,InviteMemberResp, InviteMemberReq } from './types';
import { fetchData } from '../utils';

export class OrganizationsClient {
  accessToken: string;
  baseURL: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.baseURL = 'https://api.uber.com/v1/direct';
  }

  async createOrganization(req: CreateOrgReq) {
    return fetchData<CreateOrgResp>(`${this.baseURL}/organizations`, 'POST', this.accessToken, req);
  }

  async inviteMember(organizationId: string, req: InviteMemberReq) {
    return fetchData<InviteMemberResp>(`${this.baseURL}/organizations/${organizationId}/memberships/invite`, 'POST', this.accessToken, req);
  }

  async getOrganization(organizationId: string) {
    return fetchData<CreateOrgResp>(`${this.baseURL}/organizations/${organizationId}`, 'GET', this.accessToken);
  }


}

export const createOrganizationsClient = (accessToken: string) => {
  return new OrganizationsClient(accessToken);
};
