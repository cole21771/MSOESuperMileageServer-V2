import {EventEmitter, Injectable} from '@angular/core';
import {View} from '../../interfaces/View';

@Injectable()
export class ToolbarService {
  private switchGraphModeEmitter: EventEmitter<undefined>;
  private viewChangedEmitter: EventEmitter<View>;
  private darkThemeIndicator = true;

  constructor() {
    this.switchGraphModeEmitter = new EventEmitter<undefined>();
    this.viewChangedEmitter = new EventEmitter<View>();
  }

  /**
   * Allows subscriptions to the switchGraphMode event emitter
   *
   * @returns {EventEmitter<null>} the emitter
   */
  switchGraphListener(): EventEmitter<undefined> {
    return this.switchGraphModeEmitter;
  }

  /**
   * Emits a switch graph mode event to all subscribers
   */
  switchGraphMode(): void {
    this.switchGraphModeEmitter.emit();
  }

  /**
   * Allows subscriptions to the viewChanged event emitter
   *
   * @returns {EventEmitter<number[]>} the emitter
   */
  viewChanged(): EventEmitter<View> {
    return this.viewChangedEmitter;
  }

  /**
   * Allows you to set the view for which graphs should be shown
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
