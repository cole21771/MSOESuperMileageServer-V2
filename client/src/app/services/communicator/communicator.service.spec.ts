import { TestBed, inject } from '@angular/core/testing';

import { CommunicatorService } from './communicator.service';

describe('CommunicatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommunicatorService]
    });
  });

  it('should be created', inject([CommunicatorService], (service: CommunicatorService) => {
    expect(service).toBeTruthy();
  }));
});
