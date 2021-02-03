import { TestBed } from '@angular/core/testing';

import { BancosMaestroService } from './bancos-maestro.service';

describe('BancosMaestroService', () => {
  let service: BancosMaestroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancosMaestroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
