import {TestBed, inject} from '@angular/core/testing';

import {DataService} from './data.service';
import {ConfigService} from '../config/config.service';
import {SocketIoService} from '../socket-io/socket-io.service';
import {EventEmitter} from '@angular/core';
import {Model} from '../../interfaces/Model';

class ConfigServiceStub {
  get getLabels(): string[] {
    return [];
  }

  get getModels(): Model[] {
    return [];
  }

  getLabelsFromFormula(formula: string) {
  }
}

const socketIoServiceStub = {
  getNewDataEmitter: jasmine.createSpy('getNewDataEmitter').and.returnValue(new EventEmitter<number[]>())
};

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {provide: ConfigService, useValue: new ConfigServiceStub()},
        {provide: SocketIoService, useValue: socketIoServiceStub}
      ]
    });
  });

  it('should be created',
    inject([DataService], (dataService: DataService) => {
      expect(dataService).toBeTruthy();
    }));

  it('should getLatestData',
    inject([DataService, ConfigService], (dataService: DataService, configService: ConfigService) => {
      const labels: string[] = ['Speed', 'Volts', 'Current'];
      const models: Model[] = [{
        label: 'Power',
        formula: 'Volts * Current',
        units: 'Watts'
      }];

      const labelsSpy = spyOnProperty(configService, 'getLabels', 'get').and.returnValue(labels);
      const modelsSpy = spyOnProperty(configService, 'getModels', 'get').and.returnValue(models);
      const labelFormulaSpy = spyOn(configService, 'getLabelsFromFormula').and.returnValue(['Volts', 'Current']);

      dataService.addData([2, 3, 4]);

      /*expect(labelsSpy).toHaveBeenCalled();
      expect(modelsSpy).toHaveBeenCalled();
      expect(labelFormulaSpy).toHaveBeenCalled();*/

      expect(dataService.getLatestData('Speed')).toBe(2);
      expect(dataService.getLatestData('Volts')).toBe(3);
      expect(dataService.getLatestData('Current')).toBe(4);
      expect(dataService.getLatestData('Power')).toBe(12);
    }));

  it('dataNotifier subscribers should be notified when data is added', done => {
    inject([DataService], (dataService: DataService) => {
      dataService.dataNotifier.subscribe(() => {
        done();
      });

      dataService.addData([]);
    })();
  });
});
