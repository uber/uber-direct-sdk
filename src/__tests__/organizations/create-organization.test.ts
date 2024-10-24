import crypto from "crypto";
import {
  OrganizationsClient,
  createOrganizationsClient,
} from "../../organizations";
import {
  accessToken,
  getCreateOrgReq,
  getCreateOrgResponse,
} from "../../__fixtures__";
import { getHeaders } from "../../utils";

describe("createOrganization", () => {
  let organizationsClient: OrganizationsClient;
  beforeEach(() => {
    jest.resetModules();

    organizationsClient = createOrganizationsClient(accessToken);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("calls fetchData with the correct arguments - centralized org", async () => {
    const createOrgReq = getCreateOrgReq();
    const createOrgResp = getCreateOrgResponse();

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(createOrgResp),
    });

    const resp = await organizationsClient.createOrganization(createOrgReq);
    const method = "POST";
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

  it("calls fetchData with the correct arguments - decentralized org", async () => {
    const createOrgReq = getCreateOrgReq("BILLING_TYPE_DECENTRALIZED");
    const createOrgResp = getCreateOrgResponse("BILLING_TYPE_DECENTRALIZED");

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(createOrgResp),
    });

    const resp = await organizationsClient.createOrganization(createOrgReq);
    const method = "POST";
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

  it("calls fetchData with the correct arguments - decentralized org with parent contract type", async () => {
    const createOrgReq = getCreateOrgReq(
      "BILLING_TYPE_DECENTRALIZED",
      "CONTRACT_TYPE_PARENT"
    );
    const createOrgResp = getCreateOrgResponse(
      "BILLING_TYPE_DECENTRALIZED",
      "CONTRACT_TYPE_PARENT"
    );

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(createOrgResp),
    });

    const resp = await organizationsClient.createOrganization(createOrgReq);
    const method = "POST";
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

  it.todo("throws an error if the request fails");
});
