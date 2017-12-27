import { TestBed, inject } from '@angular/core/testing';

import { EnderecosService } from './enderecos.service';

describe('EnderecosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnderecosService]
    });
  });

  it('should be created', inject([EnderecosService], (service: EnderecosService) => {
    expect(service).toBeTruthy();
  }));
});
