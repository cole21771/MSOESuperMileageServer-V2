import {EventEmitter, Injectable} from '@angular/core';
import {View} from '../../models/interfaces/config/View';

@Injectable()
export class ToolbarService {
  private graphModeSwitchedEmitter: EventEmitter<undefined>;
  private viewChangedEmitter: EventEmitter<View>;
  private darkThemeIndicator = true;

  constructor() {
    this.graphModeSwitchedEmitter = new EventEmitter();
    this.viewChangedEmitter = new EventEmitter<View>();
  }

  /**
   * Allows subscriptions to the graphModeSwitched event emitter
   *
   * @returns {EventEmitter<null>} the emitter
   */
  get graphModeSwitched(): EventEmitter<undefined> {
    return this.graphModeSwitchedEmitter;
  }

  /**
   * Emits a switch graph mode event to all subscribers
   */
  switchGraphMode(): void {
    this.graphModeSwitchedEmitter.emit();
  }

  /**
   * Allows subscriptions to the viewChanged event emitter
   *
   * @returns {EventEmitter<number[]>} the emitter
   */
  get viewChanged(): EventEmitter<View> {
    return this.viewChangedEmitter;
  }

  /**
   * Allows you to set the view for which tiles should be shown
   *
   * @param {View} view the
   */
  setView(view: View): void {
    this.viewChangedEmitter.emit(view);
  }

  /**
   * Switches the theme (light -> dark OR dark -> light)
   */
  switchTheme() {
    this.darkThemeIndicator = !this.darkThemeIndicator;
  }

  /**
   * A getter for the darkThemeIndicator
   *
   * @returns {boolean} the status of the indicator
   */
  get isDarkTheme() {
    return this.darkThemeIndicator;
  }
}
