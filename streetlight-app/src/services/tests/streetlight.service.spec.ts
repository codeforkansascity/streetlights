import { TestBed, inject } from '@angular/core/testing';

import { StreetlightService } from '../streetlight.service';

describe('StreetlightService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreetlightService]
    });
  });

  it('should be created', inject([StreetlightService], (service: StreetlightService) => {
    expect(service).toBeTruthy();
  }));

  it('should retrieve the list of streetlights', inject([StreetlightService], (service: StreetlightService) => {
    const streetlights = service.getStreetlights();
    // TODO
  }));
});
