import {TestBed, inject} from '@angular/core/testing';

import {ConfigService} from './config.service';
import {SocketIoService} from '../socket-io/socket-io.service';
import {ToolbarService} from '../toolbar/toolbar.service';
import {View} from '../../models/interfaces/View';
import {Config} from '../../models/interfaces/Config';
import {ParserVariable} from '../../models/interfaces/ParserVariable';
import {IncomingData} from '../../models/interfaces/IncomingData';
import {Model} from '../../models/interfaces/Model';

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

  it('should be created', inject([ConfigService], configService => {
      expect(configService).toBeTruthy();
    })
  );

  it('isMultiGraph() should return true when label represents MultiGraph',
    inject([ConfigService], configService => {
      const label = 'Current, Volts';
      expect(configService.isMultiGraph(label)).toBe(true);
    })
  );

  it('isMultiGraph() should return false when label does not represent MultiGraph',
    inject([ConfigService], configService => {
      const label = 'Current';
      expect(configService.isMultiGraph(label)).toBe(false);
    })
  );

  it('createDataModel() should create an IncomingData object given a Model', done => {
    inject([ConfigService], configService => {
      setTimeout(() => {
        const incomingData = configService.createDataModel(mockConfig.models[0]);

        expect(incomingData.label).toBe('Power');
        expect(incomingData.min).toBe(0);
        expect(incomingData.max).toBe(450);
        expect(incomingData.units).toBe('Watts');
        done();
      });
    })();
  });

  it('getModels should return models', inject([ConfigService], configService => {
    setTimeout(() => {
      expect(configService.getModels).toBe(mockConfig.models);
    });
  }));

  it('getViews should return views', inject([ConfigService], configService => {
    setTimeout(() => {
      expect(configService.getViews).toBe(mockConfig.views);
    });
  }));

  it('getGraphInfo should return graphInfo', inject([ConfigService], configService => {
    setTimeout(() => {
      /*const graphInfo: GraphInfo[] = {

      };
      expect(configService.getGraphInfo).toBe(graphInfo);*/
      // TODO Finish complex test
    });
  }));

  it('calculate should return the proper number when given data and a addition formula',
    inject([ConfigService], configService => {
      const variables: ParserVariable[] = [
        {
          label: 'Current',
          value: 5
        },
        {
          label: 'Volts',
          value: 7
        }
      ];

      const formula = 'Current + Volts';

      expect(configService.calculate(variables, formula)).toBe(12);
    })
  );

  it('calculate should return the proper number when given data and a subtraction formula',
    inject([ConfigService], configService => {
      const variables: ParserVariable[] = [
        {
          label: 'Current',
          value: 5
        },
        {
          label: 'Volts',
          value: 7
        }
      ];

      const formula = 'Current - Volts';

      expect(configService.calculate(variables, formula)).toBe(-2);
    })
  );

  it('calculate should return the proper number when given data and a multiplication formula',
    inject([ConfigService], configService => {
      const variables: ParserVariable[] = [
        {
          label: 'Current',
          value: 5
        },
        {
          label: 'Volts',
          value: 7
        }
      ];

      const formula = 'Current * Volts';

      expect(configService.calculate(variables, formula)).toBe(35);
    })
  );

  it('calculate should return the proper number when given data and a multiplication formula',
    inject([ConfigService], configService => {
      const variables: ParserVariable[] = [
        {
          label: 'Current',
          value: 5
        },
        {
          label: 'Volts',
          value: 7
        }
      ];

      const formula = 'Current / Volts';

      expect(configService.calculate(variables, formula)).toBeCloseTo(.714);
    })
  );

  it('getInfoFromLabel should return IncomingData object when provided with a valid label',
    inject([ConfigService], configService => {
      setTimeout(() => {
        const expectedData: IncomingData = {
          label: 'Current',
          min: 0,
          max: 30,
          units: 'A'
        };

        const actualData = configService.getInfoFromLabel('Current');

        expect(actualData.label).toBe(expectedData.label);
        expect(actualData.min).toBe(expectedData.min);
        expect(actualData.max).toBe(expectedData.max);
        expect(actualData.units).toBe(expectedData.units);
      });
    })
  );

  it('isValidModel should return true when provided a valid model',
    inject([ConfigService], configService => {
      setTimeout(() => {
        expect(configService.isValidModel(mockConfig.models[0])).toBeTruthy();
      });
    })
  );

  it('isValidModel should return false when provided an invalid model',
    inject([ConfigService], configService => {
      setTimeout(() => {
        const mockModel: Model = {
          label: 'Variables',
          formula: 'Do * Not * Exist',
          units: 'Blarg!'
        };
        expect(configService.isValidModel(mockModel)).toBeFalsy();
      });
    })
  );
});
