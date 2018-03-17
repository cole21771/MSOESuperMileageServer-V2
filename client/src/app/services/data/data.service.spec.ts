import {TestBed, inject} from '@angular/core/testing';

import {DataService} from './data.service';
import {ConfigService} from '../config/config.service';
import {SocketIoService} from '../socket-io/socket-io.service';
import {EventEmitter} from '@angular/core';

const configServiceStub = {
  getLabels: ['Speed', 'Volts', 'Current'],
  getModels: [
    {
      label: 'Power',
      formula: 'Volts * Current',
      units: 'Watts'
    }
  ],
  getLabelsFromFormula: (formula: string) => {
    return ['Volts', 'Current'];
  }
};

const socketIoServiceStub = {
  getNewDataEmitter: jasmine.createSpy('getNewDataEmitter').and.returnValue(new EventEmitter<number[]>())
};

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {provide: ConfigService, useValue: configServiceStub},
        {provide: SocketIoService, useValue: socketIoServiceStub}
      ]
    });
  });

  it('should be created',
    inject([DataService], dataService => {
      expect(dataService).toBeTruthy();
    }));

  it('should getLatestData',
    inject([DataService], dataService => {
      dataService.addData([2, 3, 4]);

      expect(dataService.getLatestData('Speed')).toBe(2);
      expect(dataService.getLatestData('Volts')).toBe(3);
      expect(dataService.getLatestData('Current')).toBe(4);
      expect(dataService.getLatestData('Power')).toBe(12);

      dataService.addData([6, 12, 9]);

      expect(dataService.getLatestData('Speed')).toBe(6);
      expect(dataService.getLatestData('Volts')).toBe(12);
      expect(dataService.getLatestData('Current')).toBe(9);
      expect(dataService.getLatestData('Power')).toBe(108);
    }));

  it('dataNotifier subscribers should be notified when data is added with addData()', done => {
    inject([DataService], dataService => {
      dataService.dataNotifier.subscribe(() => {
        done();
      });

      dataService.addData([]);
    })();
  });
});
