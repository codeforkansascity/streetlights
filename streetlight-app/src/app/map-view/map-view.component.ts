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
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  title = 'Streetlights';
  lat = 39.106579;
  lng = -94.622835;
  zoom = 11;
  minZoom = 3;
  maxZoom = 20;
  mapDraggable = true;
  streetlightMarkers: Marker[];
  filteredStreetlightMarkers: Marker[];
  wireless: boolean;
  poleOwnerFilter: string;
  poleIdFilter: string;
  lightAttributeFilter = [];
  wattage: number;
  attachedTech: boolean;
  latitudeMaxFilter: number;
  latitudeMinFilter: number;
  longitudeMaxFilter: number;
  longitudeMinFilter: number;
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
          m.setPoleType(streetlight.poleType);
          m.setAttachedTech(streetlight.attachedTech);
          m.setLumens(streetlight.lumens);
          m.setWattage(streetlight.wattage);
          m.setLightBulbType(streetlight.lightbulbType);
          this.streetlightMarkers.push(m);
          this.filteredStreetlightMarkers.push(m);
        });
      });
    });
  }

  private applyFilters() {
    console.dir(this.filters);
    this.filteredStreetlightMarkers = _.filter(this.streetlightMarkers, _.conforms(this.filters));
    console.dir(this.filteredStreetlightMarkers);
  }

  /// filter property by equality to rule
  filterExact(property: string, rule: any) {
    console.log(property, rule);
    if (rule === '' || !rule) {
      this.removeFilter(property);
      this.applyFilters();
    } else {
      this.filters[property] = val => val == rule;
      this.applyFilters();
    }

  }

  /// filter  numbers greater than rule
  filterGreaterThan(property: string, rule: number) {
    console.log(property, rule);
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
    delete this.filters[property];
    this[property] = null;
    this.applyFilters();
  }

  clearFilters() {
    this.filters = {};
    this.applyFilters();
  }


}
