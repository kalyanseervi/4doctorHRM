import { TestBed } from '@angular/core/testing';

import { RegistrService } from './registr.service';

describe('RegistrService', () => {
  let service: RegistrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
