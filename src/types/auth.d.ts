/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/oauth/v2/token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Login
         * @description Get a valid access token.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/x-www-form-urlencoded": components["schemas"]["LoginReq"];
                };
            };
            responses: {
                /** @description Successfully fetched an access token */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["LoginResp"];
                    };
                };
            };
        };
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
        LoginReq: {
            /** @description Your application client ID */
            client_id?: string;
            /** @description Your application client secret */
            client_secret?: string;
            /** @enum {string} */
            grant_type?: "client_credentials";
            /**
             * @description A space-separated list of scopes
             * @example eats.deliveries direct.organizations
             */
            scope?: string;
        };
        LoginResp: {
            /** @description Used to make authenticated calls to the API */
            access_token?: string;
            /** @description Should be Bearer */
            token_type?: string;
            /** @description Number of seconds that the access token is valid */
            expires_in?: number;
            /** @description Should match the scopes you passed in */
            scope?: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
