# Uber Direct JS SDK

_The Uber Direct SDK is currently in beta. We're actively working on improvements and appreciate your patience. If you encounter any bugs or issues, please don't hesitate to create a Github issue in this repo. Your feedback is invaluable as we continue to develop the SDK._

![Unit test coverage](https://github.com/uber/uber-direct-sdk/blob/main/badges/badge-lines.svg)

The Uber Direct Javascript SDK is a zero dependency npm package that allows developers to easily interact with the Uber Direct APIs. The SDK includes three modules:

- `uber-direct/auth` - Enables developers to obtain an access token by providing a client ID, secret, grant type, and a list of scopes.
- `uber-direct/deliveries` - Enables developers to create and manage deliveries.
- `uber-direct/organizations` - Enables developers to manage organizations and user memberships.

The SDK is designed to be easy to use and fully documented, with [examples](https://github.com/uber/uber-direct-sdk-samples) provided for all the functions.

## Usage

### Set Environment Variables

To use the Uber Direct JS SDK, you must authenticate with a client ID and secret. To make API calls, you'll also need a customer token. Set these as environment variables.

```
export UBER_DIRECT_CLIENT_ID=your_client_id
export UBER_DIRECT_CLIENT_SECRET=your_client_secret
export UBER_DIRECT_CUSTOMER_ID=your_customer_token
```

### Authentication & Deliveries Client

You can use the `uber-direct/auth` module to fetch an access token. Please refer to the [Developer Docs](https://developer.uber.com/docs/deliveries/authentication) for more info.

First, fetch your access token, then create a Deliveries client:

```js
import { getAccessToken } from 'uber-direct/auth';
import { createDeliveriesClient, deliveriesClient } from "uber-direct/deliveries";

const token = await getAccessToken();
const deliveriesClient = createDeliveriesClient(token);
```

You can use this client for subsequent requests.

#### Create Quote

```js
const quoteReq = {
  pickupAddress: '425 Market St, San Francisco, CA 94105',
  dropoffAddress: '201 3rd St, San Francisco, CA 94103',
};
const quote = await deliveriesClient.createQuote(quoteReq);
```

See more [examples](https://github.com/uber/uber-direct-sdk-samples).

#### Create Delivery

```js
const deliveryRequest = {
  pickup_name: 'Mager',
  pickup_address: '425 Market St, San Francisco, CA 94105',
  pickup_phone_number: '+14155551212',
  dropoff_name: 'Anant',
  dropoff_address: '201 3rd St, San Francisco, CA 94103',
  dropoff_phone_number: '+14155551212',
  manifest_items: [
    {
      name: 'Thing 1',
      quantity: 1,
      size: 'small',
      price: 1000,
      dimensions: {
        length: 20,
        height: 7,
        depth: 15,
      },
      must_be_upright: false,
    },
  ],
  testSpecifications: {
    roboCourierSpecification: {
      mode: 'auto',
    },
  },
};
const delivery = await deliveriesClient.createDelivery(deliveryRequest);
console.log(`Your delivery ID is: ${delivery.id} (${delivery.tracking_url})`);
```

See more [examples](https://github.com/uber/uber-direct-sdk-samples).

#### Get Delivery

```js
const deliveryId = 'del_v5Fa7dJfRz-oInZLWGCvlQ';
const delivery = await deliveriesClient.getDelivery(deliveryId);
console.log(`Your delivery status is: ${delivery.status} (Order ID: ${delivery.tracking_url})`);
```

See more [examples](https://github.com/uber/uber-direct-sdk-samples).

#### List Deliveries

```js
const deliveries = await deliveriesClient.listDeliveries();
deliveries.forEach((delivery) => {
  console.log(`- ${delivery.status} (Order ID: ${delivery.tracking_url})`);
});
```

See more [examples](https://github.com/uber/uber-direct-sdk-samples).

#### Update Delivery

```js
const req = {
  dropoff_notes: 'Call when you arrive',
  dropoff_seller_notes: 'Call when you arrive',
  dropoff_verification: verification,
  manifest_reference: 'manifest_reference',
  pickup_notes: 'Call when you arrive',
  pickup_verification: verification,
  requires_dropoff_signature: true,
  requires_id: true,
  tip_by_customer: 500,
  dropoff_latitude: 37.776619,
  dropoff_longitude: -122.417385,
};
const delivery = await deliveriesClient.updateDelivery(deliveryId, req);
console.log(`Your delivery tip is: ${delivery.tip} (Order ID: ${delivery.tracking_url})`);
```

See more [examples](https://github.com/uber/uber-direct-sdk-samples).

#### Cancel Delivery

```js
const canceledDelivery = await deliveriesClient.cancelDelivery(deliveryId);
console.log(
  `Your delivery status is: ${canceledDelivery.status} (Order ID: ${delivery.tracking_url})`
);
```

See more [examples](https://github.com/uber/uber-direct-sdk-samples).

#### Create Organization

```js
const createOrgReq = {
  info: {
    name: 'Test Organization',
    billing_type: 'BILLING_TYPE_CENTRALIZED',
  },
  hierarchy_info: {
    parent_organization_id: '4fe73ff8-0c9a-5ca3-aa2f-17ef3a8487d5',
  },
  options: {
    onboarding_invite_type: 'ONBOARDING_INVITE_TYPE_EMAIL',
  },
};
const organization = await organizationsClient.createOrganization(createOrgReq);
console.log(`Your organization ID is: ${organization.organization_id}`);
```

See more [examples](https://github.com/uber/uber-direct-sdk-samples).

#### Error Handling

The following fields are available on each error object:

- `status` - The HTTP status code (400+)
- `code` - The error code, like `invalid_params`.
- `message` - Detailed error message like `The parameters of your request were invalid.`
- `metadata` - An object with more information about the error message, for example: `{"dropoff_address": "This field is required."}`

Example:

```js
const token = await getAccessToken();
const deliveriesClient = createDeliveriesClient(token);

const quoteReq = {
  pickup_address: JSON.stringify({
    street_address: ['425 Market St'],
    city: 'San Francisco',
    state: 'CA',
    zip_code: '94105',
    country: 'US',
  }),
};
try {
  const quote = await deliveriesClient.createQuote(quoteReq);
  console.log(`Your delivery quote ID is: ${quote.id}`);
} catch (error) {
  console.error(`The error status is: ${error.status}`);
  console.error(`The error code is: ${error.code}`);
  console.error(`The error message is: ${error.message}`);
  console.error(`The error details are: ${JSON.stringify(error.metadata, null, 2)}`);
}
```

## Requirements

### Uber Direct Account

To create an Uber Direct developer account, visit [https://direct.uber.com](https://direct.uber.com) and sign up. You can find your keys on the Developer tab in the dashboard.

Your app must have the following scopes to access each API:

- Direct API: `eats.deliveries`
- Organizations API: `direct.organizations`

You should pass in these scopes when requesting an access token (see [Authentication](#authentication) above).

### Node

This package has support for Node versions 18 and above. You can install it with `brew` on Mac:

```sh
brew install node@18
```

For Windows, check out [nvm-windows](https://github.com/coreybutler/nvm-windows).

For more Node downloads, check out this [link](https://nodejs.org/en/download).

## Development

If you want to make changes to the Uber Direct JS SDK, follow instructions below.

### Install dependencies

```sh
npm install
npm i -D openapi-typescript
```

### Generate types

```sh
npm run types
```

### Tests

#### Unit Tests

Run tests with: `npm run test`.

You may need to create your watchman folder manually:

```sh
sudo mkdir /usr/local/var/run/watchman
sudo mkdir /usr/local/var/run/watchman/$(whoami)-state
sudo chown -R $(whoami) /usr/local/var/run/watchman/$(whoami)-state
```

#### Integration Tests

Install Playwright locally:

```
NPM_CONFIG_REGISTRY=https://registry.npmjs.com npm install -D @playwright/test
```

We use Playwright to chain actions toegether and test real data.

To run integration tests:

```
npm run test:integration
```

To open last HTML report run:

```
npm run test:integration:report
```
