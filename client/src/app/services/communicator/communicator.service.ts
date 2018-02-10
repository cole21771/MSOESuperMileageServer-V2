import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class CommunicatorService {
  @Output() refreshUIEmitter: EventEmitter<null> = new EventEmitter();

  refreshButtonClicked(): EventEmitter<null> {
    return this.refreshUIEmitter;
  }

  refreshUI(): void {
    this.refreshUIEmitter.emit(null);
  }
}
