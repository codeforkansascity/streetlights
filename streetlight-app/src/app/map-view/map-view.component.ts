import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { StreetlightService } from '../../services/streetlight.service';
import { Marker } from '../models/marker';
import { Promise } from 'q';
import { LogService } from '../shared/log.service';
import * as _ from 'lodash';
import { Streetlight } from '../models/streetlight';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  title = 'Streetlights';
  lat = 38.9128811;
  lng = -94.49075022;
  zoom = 6;
  minZoom = 3;
  maxZoom = 20;
  mapDraggable = true;
  streetlightMarkers: Marker[];
  filteredStreetlightMarkers: Marker[];
  wireless: boolean;
  poleOwnerFilter: string;
  lightBulbTypeOptions = [
    { label: 'Halogen', value: 'Halogen' },
    { label: 'Incandescent', value: 'Incandescent' },
    { label: 'Florescent', value: 'Florescent'},
  ];
  selectedLightBulbType: string;

  filters = {};

  constructor(private logger: LogService, private service: StreetlightService) {
    this.streetlightMarkers = [];
    this.filteredStreetlightMarkers = [];
  }

  ngOnInit() {
    this.getStreetlights();
    this.applyFilters();
    console.dir(this.streetlightMarkers);
    console.dir(this.filteredStreetlightMarkers);
  }

  getStreetlights() {

    return Promise( (resolve, reject) => {
      this.service.getStreetlights().subscribe( streetlights => {
        console.dir(streetlights);
        streetlights.map( streetlight => {
          const m = new Marker();
          m.setLng(streetlight.longitude);
          m.setLat(streetlight.latitude);
          m.setLabel(streetlight.poleId);
          m.setWireless(streetlight.fiberWifiEnabled);
          m.setPoleOwner(streetlight.poleOwner);
          m.setLightBulbType(streetlight.lightbulbType);
          // m.setVisible(true);
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
      this.filters[property] = val => val === rule;
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
    console.log(property, rule);
    if (!rule) {
      this.removeFilter(property);
    } else {
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

  clearFilters() {
    this.filters = {};
    this.applyFilters();
  }


}
