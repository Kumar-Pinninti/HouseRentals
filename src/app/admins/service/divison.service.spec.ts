import { TestBed } from '@angular/core/testing';

import { DivisonService } from './divison.service';

describe('DivisonService', () => {
  let service: DivisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
