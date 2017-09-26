import { TestBed, inject } from '@angular/core/testing';

import { AppHttpOptionsService } from './app-http-options.service';

describe('AppHttpOptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppHttpOptionsService]
    });
  });

  it('should be created', inject([AppHttpOptionsService], (service: AppHttpOptionsService) => {
    expect(service).toBeTruthy();
  }));
});
