import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class ThemeService {
  @Output() eventEmitter: EventEmitter<any> = new EventEmitter();
  lastValue: String = '';

  constructor() {
  }

  setTheme(value: String) {
    this.eventEmitter.emit(value);
    this.lastValue = value;
  }

  getTheme() {
    return this.eventEmitter;
  }

  forceUpdate() {
    this.setTheme(this.lastValue);
  }
}
