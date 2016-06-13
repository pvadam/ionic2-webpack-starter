import { PLATFORM_DIRECTIVES } from '@angular/core';

export const APPLICATION_DIRECTIVES = [
];

export const DIRECTIVES = [
  {
    provide: PLATFORM_DIRECTIVES,
    multi: true,
    useValue: APPLICATION_DIRECTIVES
  }
];
