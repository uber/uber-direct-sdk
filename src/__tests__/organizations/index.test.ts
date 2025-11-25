import { createOrganizationsClient } from '../../organizations';
import { accessToken } from '../../__fixtures__';

describe('OrganizationsClient', () => {
  it('should return an instance of OrganizationsClient', () => {
    const organizationsClient = createOrganizationsClient(accessToken);

    expect(organizationsClient).toBeDefined();
  });

  it('success - should use production URL by default', () => {
    const organizationsClient = createOrganizationsClient(accessToken);

    expect(organizationsClient).toBeDefined();
    expect(organizationsClient.baseURL).toEqual('https://api.uber.com/v1/direct');
  });

  it('success - should use sandbox URL when environment is set to sandbox', () => {
    const organizationsClient = createOrganizationsClient(accessToken, {
      environment: 'sandbox'
    });

    expect(organizationsClient).toBeDefined();
    expect(organizationsClient.baseURL).toEqual('https://api-sandbox.uber.com/v1/direct');
  });

  it('success - should use production URL when environment is set to production', () => {
    const organizationsClient = createOrganizationsClient(accessToken, {
      environment: 'production'
    });

    expect(organizationsClient).toBeDefined();
    expect(organizationsClient.baseURL).toEqual('https://api.uber.com/v1/direct');
  });
});
