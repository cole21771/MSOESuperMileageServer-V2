import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class ThemeService {
  @Output() fire: EventEmitter<any> = new EventEmitter();
  lastValue: String = '';

  constructor() {
  }

  emit(value: String) {
    this.fire.emit(value);
    this.lastValue = value;
  }

  getEmittedValue() {
    return this.fire;
  }

  forceEmit() {
    this.emit(this.lastValue);
  }
}
