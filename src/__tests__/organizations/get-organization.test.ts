import crypto from 'crypto';
import { OrganizationsClient, createOrganizationsClient } from '../../organizations';
import type { BillingType, OnboardingInviteType } from '../../organizations/types';
import { accessToken, createOrgResp, organizationId } from '../../__fixtures__';
import { getHeaders } from '../../utils';

describe('getOrganization', () => {
  let organizationsClient: OrganizationsClient;
  beforeEach(() => {
    jest.resetModules();

    organizationsClient = createOrganizationsClient(accessToken);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should make a GET request with the required parameters', async () => {

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(createOrgResp),
    });



    const organization = await organizationsClient.getOrganization(organizationId);
    const method = 'GET';
    expect(global.fetch).toHaveBeenCalledWith(
      `${organizationsClient.baseURL}/organizations/${organizationId}`,
      {
        method,
        headers: getHeaders(accessToken, method),
      }
    );
    expect(organization).toEqual(createOrgResp);
  });

  it('should handle errors', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce({
      response: {
        data: {
          message: 'The requested resource does not exist.',
        },
      },
    });

    await expect(organizationsClient.getOrganization(organizationId)).rejects.toThrowErrorMatchingSnapshot();
  });
});
