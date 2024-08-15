import { test, expect } from "@playwright/test";
import {
  getAccessToken,
  createDeliveriesClient,
} from "../../dist/src/index.js";

test("create quote and use quote ID to create delivery", async () => {
  // Initialize SDK
  const token = await getAccessToken();
  const sdk = createDeliveriesClient(token);

  // Create Quote
  const quoteReq = {
    pickup_address: JSON.stringify({
      street_address: ["425 Market St"],
      city: "San Francisco",
      state: "CA",
      zip_code: "94105",
      country: "US",
    }),
    dropoff_address: JSON.stringify({
      street_address: ["201 3rd St"],
      city: "San Francisco",
      state: "CA",
      zip_code: "94103",
      country: "US",
    }),
  };
  const quote = await sdk.createQuote(quoteReq);

  expect(quote).toHaveProperty("id");
  expect(quote).toHaveProperty("kind");
  expect(quote).toHaveProperty("created");
  expect(quote).toHaveProperty("expires");
  expect(quote).toHaveProperty("fee");
  expect(quote).toHaveProperty("currency");
  expect(quote).toHaveProperty("currency_type");
  expect(quote).toHaveProperty("dropoff_eta");
  expect(quote).toHaveProperty("duration");
  expect(quote).toHaveProperty("pickup_duration");
  expect(quote).toHaveProperty("dropoff_deadline");

  console.info("Create Quote successful! Quote ID: ", quote.id);

  const deliveryRequest = {
    quote_id: quote.id,
    pickup_name: "Store Name",
    pickup_address: JSON.stringify({
      street_address: ["425 Market St"],
      city: "San Francisco",
      state: "CA",
      zip_code: "94105",
      country: "US",
    }),
    pickup_phone_number: "+14155551212",
    dropoff_name: "Customer Name",
    dropoff_address: JSON.stringify({
      street_address: ["201 3rd St"],
      city: "San Francisco",
      state: "CA",
      zip_code: "94103",
      country: "US",
    }),
    dropoff_phone_number: "+14155551212",
    manifest_items: [
      {
        name: "iPhone",
        quantity: 1,
        size: "small",
      },
      {
        name: "iPad",
        quantity: 1,
        size: "medium",
      },
    ],
    test_specifications: {
      robo_courier_specification: {
        mode: "auto",
      },
    },
  };

  // Create Delivery
  const delivery = await sdk.createDelivery(deliveryRequest);

  expect(delivery).toHaveProperty("id");
  expect(delivery).toHaveProperty("quote_id");
  expect(delivery).toHaveProperty("status");
  expect(delivery).toHaveProperty("complete");
  expect(delivery).toHaveProperty("kind");
  expect(delivery).toHaveProperty("pickup");
  expect(delivery).toHaveProperty("dropoff");
  expect(delivery).toHaveProperty("manifest");
  expect(delivery).toHaveProperty("manifest_items");
  expect(delivery).toHaveProperty("created");
  expect(delivery).toHaveProperty("updated");
  expect(delivery).toHaveProperty("pickup_ready");
  expect(delivery).toHaveProperty("pickup_deadline");
  expect(delivery).toHaveProperty("dropoff_ready");
  expect(delivery).toHaveProperty("dropoff_deadline");
  expect(delivery).toHaveProperty("pickup_eta");
  expect(delivery).toHaveProperty("dropoff_eta");
  expect(delivery).toHaveProperty("fee");
  expect(delivery).toHaveProperty("currency");
  expect(delivery).toHaveProperty("tracking_url");
  expect(delivery).toHaveProperty("courier_imminent");
  expect(delivery).toHaveProperty("courier");
  expect(delivery).toHaveProperty("live_mode");
  expect(delivery).toHaveProperty("deliverable_action");
  expect(delivery).toHaveProperty("return");

  console.info("Create Delivery successful! Delivery ID: ", delivery.id);
});
