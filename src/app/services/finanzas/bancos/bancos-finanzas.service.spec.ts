import { TestBed } from '@angular/core/testing';

import { BancosFinanzasService } from './bancos-finanzas.service';

describe('BancosFinanzasService', () => {
  let service: BancosFinanzasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancosFinanzasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
