import {TestBed, inject} from '@angular/core/testing';

import {ConfigService} from './config.service';
import {SocketIoService} from '../socket-io/socket-io.service';
import {ToolbarService} from '../toolbar/toolbar.service';
import {View} from '../../interfaces/View';
import {Config} from '../../interfaces/Config';
import {Model} from "../../interfaces/Model";

const mockConfig: Config = {
  vehicleType: 'electric',
  incomingData: [
    {
      label: 'Volts',
      min: 0,
      max: 15,
      units: 'V'
    },
    {
      label: 'Current',
      min: 0,
      max: 30,
      units: 'A'
    },
    {
      label: 'Time',
      min: 0,
      max: null,
      units: 'ms'
    }
  ],
  graphs: [
    {
      xAxis: 'Volts',
      yAxis: 'Time',
      colors: ['#123456']
    },
    {
      xAxis: 'Current',
      yAxis: 'Time',
      colors: ['#654321']
    },
    {
      xAxis: 'Power',
      yAxis: 'Time',
      colors: ['#456123']
    }
  ],
  models: [
    {
      label: 'Power',
      formula: 'Volts * Current',
      units: 'Watts'
    }
  ],
  views: [
    {
      name: 'All',
      graphs: [0, 1, 2]
    }
  ],
  displayAlways: ['Power']
};

const socketIoServiceStub = {
  getSelectedConfig: () => {
    return Promise.resolve(mockConfig);
  }
};

const toolbarServiceStub = {
  setView: (view: View) => {
  }
};

describe('ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigService,
        {provide: SocketIoService, useValue: socketIoServiceStub},
        {provide: ToolbarService, useValue: toolbarServiceStub}
      ]
    });
  });

  it('should be created', inject([ConfigService, SocketIoService], (configService, socketService) => {
    expect(configService).toBeTruthy();
  }));

  it('isMultiGraph() should return true when label represents MultiGraph',
    inject([ConfigService], configService => {
      const label = 'Current, Volts';
      expect(configService.isMultiGraph(label)).toBe(true);
    }));

  it('isMultiGraph() should return false when label does not represent MultiGraph',
    inject([ConfigService], configService => {
      const label = 'Current';
      expect(configService.isMultiGraph(label)).toBe(false);
    }));

  it('createDataModel() should create an IncomingData object given a Model',
    inject([ConfigService], configService => {
      const incomingData = configService.createDataModel(mockConfig.models[0]);

      expect(incomingData.label).toBe('Power');
      expect(incomingData.min).toBe(0);
      expect(incomingData.max).toBe(450);
      expect(incomingData.units).toBe('Watts');
    })
  );


});
