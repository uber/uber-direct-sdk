import crypto from 'crypto';
import { OrganizationsClient, createOrganizationsClient } from '../../organizations';
import type { BillingType, OnboardingInviteType } from '../../organizations/types';
import { accessToken, customerId } from '../../__fixtures__';
import { getHeaders } from '../../utils';

describe('createOrganization', () => {
  let organizationsClient: OrganizationsClient;
  beforeEach(() => {
    jest.resetModules();

    organizationsClient = createOrganizationsClient(accessToken);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('calls fetchData with the correct arguments', async () => {
    // TODO: Use fixtures
    const createOrgReq = {
      info: {
        name: 'Test Organization',
        billing_type: 'BILLING_TYPE_CENTRALIZED' as BillingType,
      },
      hierarchy_info: {
        parent_organization_id: '4fe73ff8-0c9a-5ca3-aa2f-17ef3a8487d5',
      },
      options: {
        onboarding_invite_type: 'ONBOARDING_INVITE_TYPE_EMAIL' as OnboardingInviteType,
      },
    };
    const createOrgResp = {
      organization_id: crypto.randomUUID(),
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(createOrgResp),
    });

    const resp = await organizationsClient.createOrganization(createOrgReq);
    const method = 'POST';
    expect(global.fetch).toHaveBeenCalledWith(
      `${organizationsClient.baseURL}/organizations`,
      {
        method,
        headers: getHeaders(accessToken, method),
        body: JSON.stringify(createOrgReq),
      }
    );
    expect(resp).toEqual(createOrgResp);
  });

  it.todo('throws an error if the request fails');
});
