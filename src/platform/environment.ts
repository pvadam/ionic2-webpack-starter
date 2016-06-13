import { enableProdMode } from '@angular/core';

// Environment Providers
let PROVIDERS = [];

if ('prd' === ENV) {
  enableProdMode();

  PROVIDERS = [
    ...PROVIDERS
  ];

} else {
  PROVIDERS = [
    ...PROVIDERS
  ];

}

export const ENV_PROVIDERS = [
  ...PROVIDERS
];
