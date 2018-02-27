import { TestBed, inject } from '@angular/core/testing';

import { MapService } from './map.service';

describe('MapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapService]
    });
  });

  it('should be created', inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy();
  }));

  it('should retrieve the list of streetlights', inject([MapService], (service: MapService) => {
    var streetlights = service.getStreetlights();
    // TODO
  });
});
