import { TestBed } from '@angular/core/testing';

import { Dispensador } from './dispensador';

describe('Dispensador', () => {
  let service: Dispensador;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dispensador);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
