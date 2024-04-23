#!/bin/bash

NPM_CONFIG_REGISTRY=https://registry.npmjs.com/
npx openapi-typescript ./src/auth/openapi.yaml -o ./src/types/auth.d.ts
npx openapi-typescript ./src/deliveries/openapi.yaml -o ./src/types/deliveries.d.ts
npx openapi-typescript ./src/organizations/openapi.yaml -o ./src/types/organizations.d.ts
