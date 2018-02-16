import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class CommunicatorService {
  private refreshUIEmitter: EventEmitter<null> = new EventEmitter();
  private viewChangedEmitter: EventEmitter<number[]> = new EventEmitter<number[]>();

  refreshButtonClicked(): EventEmitter<null> {
    return this.refreshUIEmitter;
  }

// TODO try out getters and setters with shared variables

  refreshUI(): void {
    this.refreshUIEmitter.emit(null);
  }

  setGraphs(graphs: number[]) {
    this.viewChangedEmitter.emit(graphs);
  }

  viewChanged(): EventEmitter<number[]> {
    return this.viewChangedEmitter;
  }
}
