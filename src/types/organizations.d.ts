/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/organizations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create Direct Organizations
         * @description Create a new sub-organization under the given parent organization ID.
         *     - The created organizations will use the same integration credentials as the Direct Account (client_id and client_secret) for authentication.
         *     - After a new Org is created, it will be uniquely identified by it's `organization_id` which translates to the `customer_id` parameter in future API requests. Use this UUID in the API requests to create and manage deliveries at the respective Org-level.
         *         Example: CreateQuote:  _https://api.uber.com/v1/customers/{customer_id}/deliveries_ replace the `{customer_id}` with the UUID created for the Org.
         *     - Sub-organizations should be created on an as-needed basis as they can only be deleted manually by the Uber team.
         *     - If you need to update Org information or delete the Org, please reach out to your Uber business contact.
         *
         */
        post: operations["CreateOrg"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{organization_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Direct Organization Details
         * @description Fetch information about one specific organization.
         */
        get: operations["GetOrg"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{organization_id}/memberships/invite": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Invite New User to Organization
         * @description Create a new membership in the given organization. The new user will receive an invitation at the e-mail address specified.
         */
        post: operations["InviteToOrg"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        CreateOrgReq: {
            /** @description Information about the organization. */
            info?: components["schemas"]["OrganizationInfo"];
            /** @description Organization's hierarchy details. */
            hierarchy_info?: components["schemas"]["HierarchyInfo"];
            options?: components["schemas"]["Options"];
        };
        OrganizationInfo: {
            /**
             * @description Business name of the organization.
             *
             *     **Note:** URLs and the following characters are not allowed:
             *     `/`, `\`, `:`, `%`, `<`, `>`, `#`, `=`.
             *
             * @example Sample Sub-Org Name
             */
            name: string;
            /** @description Centralized or decentralized. */
            billing_type: components["schemas"]["BillingType"];
            /** @description Merchant type of the organization, e.g. Grocery, retail, restaurants */
            merchant_type?: components["schemas"]["MerchantType"];
            /** @description Contact details of the organization. Communications related to the organization will be sent here. */
            point_of_contact?: components["schemas"]["PointOfContact"];
            /** @description Contract type of the organization. */
            contract_type?: components["schemas"]["ContractType"];
            /** @description Required when using `BILLING_TYPE_DECENTRALIZED`. */
            address?: components["schemas"]["Address"];
        };
        HierarchyInfo: {
            /**
             * @description Parent organization ID. This is the (Root Org) found via the customer_id displayed on the developer dashboard billing.
             * @example a11e6f29-6850-4d8d-b88d-0ae69cec1111
             */
            parent_organization_id: string;
        };
        /** @description Object that holds the fields that work as attributes to the CreateOrganization request. */
        Options: {
            onboarding_invite_type?: components["schemas"]["OnboardingInviteType"];
        };
        /**
         * @description Indicates a webform should be sent to collect billing and tax information. The webform will be sent to the POC specified in the request:
         *     | Type | Description |
         *     |--------|--------|
         *     | ONBOARDING_INVITE_TYPE_INVALID | Reserved value. Indicating no email will be sent. |
         *     | ONBOARDING_INVITE_TYPE_EMAIL | Indicating an onboarding webform should be sent via Email.
         *
         * @enum {string}
         */
        OnboardingInviteType: "ONBOARDING_INVITE_TYPE_INVALID" | "ONBOARDING_INVITE_TYPE_EMAIL";
        /**
         * @description The organization's business type
         * @enum {string}
         */
        MerchantType: "MERCHANT_TYPE_RESTAURANT" | "MERCHANT_TYPE_GROCERY" | "MERCHANT_TYPE_LIQUOR" | "MERCHANT_TYPE_RETAIL" | "MERCHANT_TYPE_ESSENTIALS" | "MERCHANT_TYPE_PHARMACY" | "MERCHANT_TYPE_SPECIALTY_FOOD" | "MERCHANT_TYPE_FLOWER" | "MERCHANT_TYPE_PET_SUPPLY";
        PointOfContact: {
            /**
             * @description Primary contact for the organization. This email address will be linked to the Org, giving them admin-level access to the organization.
             *
             *     **Note:** This field is required in case of billing_type: `BILLING_TYPE_DECENTRALIZED`
             *
             * @example name@email.com
             */
            email?: string;
            /** @description Phone details of primary contact. */
            phone_details?: components["schemas"]["PhoneDetails"];
        };
        PhoneDetails: {
            /**
             * @description Full phone number including country code and subscriber number, e.g. `15555555555`
             * @example 15555555555
             */
            phone_number?: string;
            /**
             * @description Phone number country code [https://countrycode.org](https://countrycode.org) E.g. `1` for U.S.
             * @example 1
             */
            country_code?: string;
            /**
             * @description Subscriber phone number E.g. `5555555555`
             * @example 5555555555
             */
            subscriber_number?: string;
        };
        /**
         * @description | Type | Description |
         *     |--------|--------|
         *     | BILLING_TYPE_CENTRALIZED | Billing type is centralized if the (Root Org/Direct Account) Account is responsible for billing. |
         *     | BILLING_TYPE_DECENTRALIZED | Billing type is decentralized if a (child) Org is responsible for their own billing.
         *
         *     **IMPORTANT:** `BILLING_TYPE_DECENTRALIZED` requires Uber's involvement to set up the billing policy before deliveries can be created.
         *
         * @enum {string}
         */
        BillingType: "BILLING_TYPE_CENTRALIZED" | "BILLING_TYPE_DECENTRALIZED";
        /**
         * @description Contract type of the organization.
         *     | Type | Description |
         *     |--------|--------|
         *     | CONTRACT_TYPE_PARENT | Opt-in to the parent organization's contract. |
         *     | CONTRACT_TYPE_CUSTOM | Use a custom contract. |
         *
         * @enum {string}
         */
        ContractType: "CONTRACT_TYPE_PARENT" | "CONTRACT_TYPE_CUSTOM";
        /** @description Billing address, required in the event of a `BILLING_TYPE_DECENTRALIZED` billing_type. */
        Address: {
            /**
             * @description The street detail if needed, for example 2000 Tustin Ave.
             * @example 2000 Tustin Ave
             */
            street1?: string;
            /**
             * @description Additional street detail if needed
             * @example
             */
            street2?: string;
            /**
             * @description The city detail for the address, for example “Irvine”
             * @example Irvine
             */
            city?: string;
            /**
             * @description The state detail for the address, for example “CA” for California
             * @example CA
             */
            state?: string;
            /**
             * @description The zipcode detail for the address, for example “92602”.
             * @example 92602
             */
            zipcode?: string;
            /**
             * @description Country code in 2-char ([ISO 3166 alpha2](https://www.iban.com/country-codes)) format.
             *
             *     **Note:** This field is required in case of billing_type: `BILLING_TYPE_DECENTRALIZED`
             *
             * @example US
             */
            country_iso2?: string;
        };
        CreateOrgResp: {
            /**
             * @description Unique identifier of the organization represented as a UUID.
             * @example a11e6f29-6850-4d8d-b88d-0ae69cec1111
             */
            organization_id?: string;
            /** @description Information about the organization. */
            info?: components["schemas"]["OrganizationInfo"];
            /** @description Organization's hierarchy details. */
            hierarchy_info?: components["schemas"]["HierarchyInfo"];
        };
        OrgInviteReq: {
            /** @description The new user's information. */
            user_details?: components["schemas"]["UserDetails"];
            /** @description User roles granted to the newly created user:
             *     | Role | Description |
             *     |--------|--------|
             *     | ROLE_ADMIN  | Administrators have full access to the organization's Direct Dashboard. Includes access to the Billing section, the Developer section, and the ability to add/modify users. |
             *     | ROLE_EMPLOYEE | Employees can create deliveries and view past deliveries for the organization. |
             *      */
            roles: components["schemas"]["Role"][];
        };
        UserDetails: {
            /**
             * @description E-mail address of the user.
             *
             * @example john@email.com
             */
            email: string;
            /**
             * @description First name of the user.
             *
             *     **Note:** URLs and the following characters are not allowed:
             *     `/`, `\`, `:`, `%`, `<`, `>`, `#`, `=`.
             *
             * @example John
             */
            first_name: string;
            /**
             * @description Last name of the user.
             *
             *     **Note:** URLs and the following characters are not allowed:
             *     `/`, `\`, `:`, `%`, `<`, `>`, `#`, `=`.
             *
             * @example Smith
             */
            last_name: string;
            phone_details?: components["schemas"]["PhoneDetails"];
        };
        /** @enum {string} */
        Role: "ROLE_ADMIN" | "ROLE_EMPLOYEE";
        OrgInviteResp: {
            /**
             * @description Unique identifier as the new user, represented as a UUID.
             * @example h52ngf31-68f0-5d8d-b88g-0ae69cec9984
             */
            membership_id?: string;
            /**
             * @description Unique identifier of the organization, represented as a UUID.
             * @example a11e6f29-6850-4d8d-b88d-0ae69cec1111
             */
            organization_id?: string;
            /** @description The user's information. */
            user_details?: components["schemas"]["UserDetails"];
            /** @description Roles granted to the newly created user. */
            roles?: components["schemas"]["Role"][];
        };
        Error: {
            /** @description Error */
            error?: string;
            /** @description Error code */
            code?: string;
            /** @description Error description */
            message?: string;
        };
    };
    responses: never;
    parameters: {
        /**
         * @description Unique identifier of an organization represented as UUID. Note: UUID is case-sensitive.
         * @example a11e6f29-6850-4d8d-b88d-0ae69cec1111
         */
        organizationId: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    CreateOrg: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["CreateOrgReq"];
            };
        };
        responses: {
            /** @description Sub-organization successfully created. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreateOrgResp"];
                };
            };
            /** @description Bad request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    GetOrg: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique identifier of an organization represented as UUID. Note: UUID is case-sensitive.
                 * @example a11e6f29-6850-4d8d-b88d-0ae69cec1111
                 */
                organization_id: components["parameters"]["organizationId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successfully retrieved organization details. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreateOrgResp"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    InviteToOrg: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique identifier of an organization represented as UUID. Note: UUID is case-sensitive.
                 * @example a11e6f29-6850-4d8d-b88d-0ae69cec1111
                 */
                organization_id: components["parameters"]["organizationId"];
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["OrgInviteReq"];
            };
        };
        responses: {
            /** @description Successfully invited user. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrgInviteResp"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
}
