import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { StreetlightService } from '../../services/streetlight.service';
import { Marker } from '../models/marker';
import { Promise } from 'q';
import { LogService } from '../shared/log.service';
import * as _ from 'lodash';
import { Streetlight } from '../models/streetlight';
import { FilterPipe } from '../pipes/filter.pipe';

interface FilterEntry {
  prop: string;
  val: any;
}

interface Filter {
  [key: string]: any;
}




@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  wattageOptions = [];
  poleOwnerOptions = [];

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
  wattageFilter: number;
  attachedTechFilter: any;
  latitudeMaxFilter: number;
  latitudeMinFilter: number;
  longitudeMaxFilter: number;
  longitudeMinFilter: number;
  selectedLightBulbType: string;
  searchText: string;

  filters = {};

  constructor(private logger: LogService, private service: StreetlightService) {
    this.streetlightMarkers = [];
    this.filteredStreetlightMarkers = [];

    // Set up dropdown listings
    this.wattageOptions = [
      { label: 'Wattage', value: null },
      { label: '100', value: 100 },
      { label: '150', value: 150 },
      { label: '175', value: 175 },
      { label: '250', value: 250 },
      { label: '400', value: 400 },
    ];

    this.poleOwnerOptions = [
      { label: 'Pole Owner', value: null },
      { label: 'Lees Summit', value: 'Lees Summit'},
      { label: 'MODL', value: 'MODL'},
      { label: 'KCPL', value: 'KCPL'},
      { label: 'VeVoo', value: 'VeVoo'}
    ];
  }

  ngOnInit() {
    this.getStreetlights();
    this.clearFilters();
  }

  /* Methods */
  
  // Populate the streetlight map marker data
  getStreetlights() {

    return Promise( (resolve, reject) => {
      this.service.getStreetlights().subscribe( streetlights => {
        streetlights.map( streetlight => {
          const m = new Marker();
          m.setPoleId(streetlight.poleId);
          m.setLng(streetlight.longitude);
          m.setLat(streetlight.latitude);
          m.setLabel(streetlight.poleId);
          m.setWireless(streetlight.fiberWifiEnabled);
          m.setPoleOwner(streetlight.poleOwner);
          m.setAttachedTech(streetlight.attachedTech);
          m.setWattage(streetlight.wattage);
          m.setLightBulbType(streetlight.lightbulbType);
          this.streetlightMarkers.push(m);
          this.filteredStreetlightMarkers.push(m);
        });
      });
    });
  }

  // Predicate function for filter
  filter(): any[] {
    let filteredMarkers = [];

    if (this.poleIdFilter !== null ) {
      filteredMarkers = this.streetlightMarkers.filter((m) => m.poleId.indexOf(this.poleIdFilter) > -1);
    } else {
      filteredMarkers = this.streetlightMarkers;
    }

    let subSetMarkers = [];
    // Applies any filters that have been set if any
    if (Object.keys(this.filters).length > 0) {
      console.dir(this.filters);
      subSetMarkers = _.filter(filteredMarkers, this.filters);
      filteredMarkers = subSetMarkers;
    }
    return filteredMarkers;
  }

  // Apply the current filters to visible streetlights
  applyFilters(prop?: string, value?: any): void {

    this.updateFilters(prop, value);

    this.filteredStreetlightMarkers = this.filter();
  }

  // Add or remove property/value keys from filter
  updateFilters(prop: string, value: any) {
    if (prop) {
      this.filters[prop] = value;
    }

    if (value === null) {
      delete this.filters[prop];
    }
  }

  // Clear filter
  clearFilters(): void {
    this.filteredStreetlightMarkers = this.streetlightMarkers;
    this.poleIdFilter = null;
    this.poleOwnerFilter = null;
    this.attachedTechFilter = null;
    this.wattageFilter = null;

    this.filters = {};
  }

}
