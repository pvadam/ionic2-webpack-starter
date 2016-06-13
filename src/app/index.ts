import { Component, ViewEncapsulation } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AppState } from './app.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState
];

@Component({
  selector: 'app',
  styles: [
    require('./app')
  ],
  pipes: [],
  providers: [],
  directives: [],
  encapsulation: ViewEncapsulation.None,
  template: `<button>Submit</button>`
})
export class App {
  private platform: Platform = null;

  static get parameters() {
    return [[Platform]];
  }

  constructor(platform: Platform) {
    this.platform = platform;
  }
}
