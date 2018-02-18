import {TestBed, inject} from '@angular/core/testing';

import {ToolbarService} from './toolbar.service';
import {View} from '../../interfaces/View';

describe('ToolbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToolbarService]
    });
  });

  it('should be created', inject([ToolbarService], (service: ToolbarService) => {
    expect(service).toBeTruthy();
  }));

  it('should notify subscribers when graph mode is switched',
    inject([ToolbarService], (service: ToolbarService) => {
      let called = false;
      service.switchGraphListener().subscribe(() => {
        called = true;
      });

      service.switchGraphMode();

      expect(called).toBeTruthy();
    }));

  it('should notify subscribers when view is changed',
    inject([ToolbarService], (service: ToolbarService) => {
      const testView: View = {
        name: 'All',
        graphs: [0, 1, 2]
      };

      let called = false;
      service.viewChanged().subscribe((view) => {
        expect(view).toEqual(testView);
        called = true;
      });

      service.setView(testView);

      expect(called).toBeTruthy();
    }));

  it('should update isDarkTheme boolean when status is switched',
    inject([ToolbarService], (service: ToolbarService) => {
      expect(service.isDarkTheme).toBeTruthy();
      service.switchTheme();
      expect(service.isDarkTheme).toBeFalsy();
    }));
});
