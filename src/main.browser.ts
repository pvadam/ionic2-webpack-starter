import { ionicBootstrap, ionicProviders } from 'ionic-angular';
import { DIRECTIVES, PIPES, PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS } from './platform/environment';
import { App, APP_PROVIDERS } from './app';

export function main(initialHmrState?: any): Promise<any> {
  return ionicBootstrap(App, [
    ...PROVIDERS,
    ...ENV_PROVIDERS,
    ...DIRECTIVES,
    ...PIPES,
    ...APP_PROVIDERS,
    ionicProviders()
  ])
  .catch(err => console.error(err));
}

if ('dev' === ENV && HMR === true) {
  require('angular2-hmr').hotModuleReplacement(main, module);
} else {
  document.addEventListener('DOMContentLoaded', () => main());
}
