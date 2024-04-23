import { createOrganizationsClient } from '../../organizations';
import { accessToken } from '../../__fixtures__';

describe('OrganizationsClient', () => {
  it('should return an instance of OrganizationsClient', () => {
    const organizationsClient = createOrganizationsClient(accessToken);

    expect(organizationsClient).toBeDefined();
  });
});
