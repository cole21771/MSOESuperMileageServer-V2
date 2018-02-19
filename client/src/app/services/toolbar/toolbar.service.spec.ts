import {TestBed, inject, async} from '@angular/core/testing';

import {ToolbarService} from './toolbar.service';
import {View} from '../../interfaces/View';

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

  it('should notify subscribers when graph mode is switched', done => {
    inject([ToolbarService], (service: ToolbarService) => {
      service.switchGraphListener().subscribe(() => {
        done();
      });

      service.switchGraphMode();
    })();
  });

  it('should notify subscribers when view is changed', done => {
    inject([ToolbarService], (service: ToolbarService) => {
      const testView: View = {
        name: 'All',
        graphs: [0, 1, 2]
      };

      service.viewChanged().subscribe((view) => {
        expect(view).toEqual(testView);
        done();
      });

      service.setView(testView);
    })();
  });

  it('should update isDarkTheme boolean when status is switched',
    inject([ToolbarService], (service: ToolbarService) => {
      expect(service.isDarkTheme).toBeTruthy();
      service.switchTheme();
      expect(service.isDarkTheme).toBeFalsy();
    }));
})
;
