import { TestBed } from '@angular/core/testing';

import { NecEvaService } from './nec-eva.service';

describe('NecEvaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NecEvaService = TestBed.get(NecEvaService);
    expect(service).toBeTruthy();
  });
});
