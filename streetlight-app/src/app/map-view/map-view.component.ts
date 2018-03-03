import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MapService } from '../map.service';
import { Marker } from '../marker';
import { Promise } from 'q';
import { LogService } from '../shared/log.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  title: string = 'Streetlights';
  lat: number = 39.090265;
  lng: number = -94.576062;
  zoom: number = 6;
  minZoom: number = 8;
  mapDraggable: boolean = false;
  streetlightMarkers: Marker[];
  filteredStreetlightMarkers: Marker[];
  nema: boolean = false;
  wireless: boolean = false;
  fixtureMfg: string;
  filters = {};

  constructor(private logger: LogService, private mapService: MapService) {
    this.streetlightMarkers = [];
    this.filteredStreetlightMarkers = [];
  }

  ngOnInit() {
    this.getStreetlights();
    this.applyFilters();
  }

  getStreetlights() {
    return Promise( (resolve, reject) => {
      this.mapService.getStreetlights().subscribe( markers => {
        let inc = 1;
        markers.map( marker => {
          let m = new Marker();
          m.setLng(marker.lon);
          m.setLat(marker.lat);
          m.setStreet(marker.street);
          m.setZip(marker.zip ? marker.zip : '');
          inc += 1;
          m.setLabel(marker.street + '-' + inc);
          m.setNema(marker.nema);
          m.setWireless(marker.wireless);
          m.setFixture(marker.fixture_mfg);
          m.setVisible(true);
          this.streetlightMarkers.push(m);
          this.filteredStreetlightMarkers.push(m);
          
        });
        console.dir(this.streetlightMarkers);
      });
      
    });
  }

  private applyFilters() {
    console.log(this.filters);
    this.filteredStreetlightMarkers = _.filter(this.streetlightMarkers, _.conforms(this.filters) );
  }

  /// filter property by equality to rule
  filterExact(property: string, rule: any) {
    if (rule === '' || !rule) {
      this.removeFilter(property);
      this.applyFilters();
    } else {
      this.filters[property] = val => val == rule
      this.applyFilters();
    }

  }

  /// filter  numbers greater than rule
  filterGreaterThan(property: string, rule: number) {
    this.filters[property] = val => val > rule;
    this.applyFilters();
  }

  /// filter properties that resolve to true
  filterBoolean(property: string, rule: boolean) {
    console.log(rule);
    if (!rule) this.removeFilter(property)
    else {
      this.filters[property] = val => val;
      this.applyFilters();
    }
  }

  /// removes filter
  removeFilter(property: string) {
    delete this.filters[property]
    this[property] = null;
    this.applyFilters();
  }
}

}
