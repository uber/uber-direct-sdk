import crypto from 'crypto';
import { OrganizationsClient, createOrganizationsClient } from '../../organizations';
import type { BillingType, OnboardingInviteType } from '../../organizations/types';
import { accessToken, getExpectedHeaders, createOrgResp,  organizationId, inviteMemberReq, inviteMemberResp } from '../../__fixtures__';


describe('inviteMember', () => {
  let organizationsClient: OrganizationsClient;
  beforeEach(() => {
    jest.resetModules();

    organizationsClient = createOrganizationsClient(accessToken);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should make a POST request with the required parameters', async () => {

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(inviteMemberResp),
    });

    const inviteMember = await organizationsClient.inviteMember(organizationId, {
      ...inviteMemberReq,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${organizationsClient.baseURL}/organizations/${organizationId}/memberships/invite`,
      {
        method: 'POST',
        headers: getExpectedHeaders(accessToken),
        body: JSON.stringify(inviteMemberReq),
      }
    );
    expect(inviteMember).toEqual(inviteMemberResp);
  });

  it('should handle errors', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce({
      response: {
        data: {
          message: 'The requested resource does not exist.',
        },
      },
    });

    await expect(organizationsClient.inviteMember(organizationId, inviteMemberReq)).rejects.toThrowErrorMatchingSnapshot();
  });
});
