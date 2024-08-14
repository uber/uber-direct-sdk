import { getAccessToken, createDeliveriesClient } from 'uber-direct';

(async () => {
  const token = await getAccessToken();
  const deliveriesClient = createDeliveriesClient(token);
  const deliveryRequest = {
    pickup_name: 'Store Name',
    pickup_address: JSON.stringify({
      street_address: ['425 Market St'],
      city: 'San Francisco',
      state: 'CA',
      zip_code: '94105',
      country: 'US',
    }),
    pickup_notes: 'Follow big green signs in the parking lot',
    pickup_phone_number: '+14155551212',
    external_store_id: 'myStore123',
    dropoff_name: 'Customer Name',
    dropoff_address: JSON.stringify({
      street_address: ['201 3rd St'],
      city: 'San Francisco',
      state: 'CA',
      zip_code: '94103',
      country: 'US',
    }),
    dropoff_notes: 'apt 45',
    dropoff_phone_number: '+14155551212', // e164 format
    deliverable_action: 'deliverable_action_meet_at_door', // Happy path. Possible values: deliverable_action_meet_at_door, deliverable_action_leave_at_door
    undeliverable_action: 'leave_at_door', // Possible values: return, leave_at_door, discard
    manifest_items: [
      {
        name: 'iPhone',
        quantity: 1,
        size: 'small',
      },
      {
        name: 'iPad',
        quantity: 1,
        size: 'medium',
      },
    ],
    manifest_reference: 'REF0000001',
    manifest_total_value: 1000, // Must be in cents
    test_specifications: {
      robo_courier_specification: {
        mode: 'auto',
      },
    },
  };
  const delivery = await deliveriesClient.createDelivery(deliveryRequest);
  console.log(`Your delivery ID is: ${delivery.id} (${delivery.tracking_url})`);
})();
