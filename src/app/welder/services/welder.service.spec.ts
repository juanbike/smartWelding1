import { TestBed } from '@angular/core/testing';

import { WelderService } from './welder.service';

describe('WelderService', () => {
  let service: WelderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
