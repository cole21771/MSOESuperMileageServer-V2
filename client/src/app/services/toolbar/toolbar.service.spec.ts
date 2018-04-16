import {TestBed, inject, async} from '@angular/core/testing';

import {ToolbarService} from './toolbar.service';
import {View} from '../../models/interfaces/config/View';

describe('ToolbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToolbarService
      ]
    });
  });

  it('should be created', inject([ToolbarService], (service: ToolbarService) => {
    expect(service).toBeTruthy();
  }));

  it('graphModeSwitched subscribers should be notified when graph mode is switched', done => {
    inject([ToolbarService], (service: ToolbarService) => {
      service.graphModeSwitched.subscribe(() => {
        done();
      });

      service.switchGraphMode();
    })();
  });

  it('viewChanged subscribers should be notified when view is changed', done => {
    inject([ToolbarService], (service: ToolbarService) => {
      const testView: View = {
        name: 'All',
        tiles: [0, 1, 2]
      };

      service.viewChanged.subscribe((view) => {
        expect(view).toEqual(testView);
        done();
      });

      service.setView(testView);
    })();
  });

  it('switchTheme() should toggle isDarkTheme',
    inject([ToolbarService], (service: ToolbarService) => {
      expect(service.isDarkTheme).toBeTruthy();
      service.switchTheme();
      expect(service.isDarkTheme).toBeFalsy();
    }));
})
;
