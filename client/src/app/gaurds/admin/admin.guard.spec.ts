import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import {SocketIoService} from '../../services/socket-io/socket-io.service';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard, SocketIoService],
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
