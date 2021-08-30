import { TestBed } from '@angular/core/testing';

import { ChekFromService } from './chek-from.service';

describe('ChekFromService', () => {
  let service: ChekFromService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChekFromService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
