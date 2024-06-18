import { TestBed } from '@angular/core/testing';

import { BrazingService } from './brazing.service';

describe('BrazingService', () => {
  let service: BrazingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrazingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
