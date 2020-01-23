import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { AgmCoreModule, AgmMap, LatLngBoundsLiteral, GoogleMapsAPIWrapper, MouseEvent, MarkerManager, LatLngBounds} from '@agm/core';
import { AgmMarkerCluster } from '@agm/js-marker-clusterer';
import { StreetlightService } from '../../services/streetlight.service';
import { map } from 'rxjs/operators';
import { Marker } from '../models/marker';
import { LogService } from '../shared/log.service';
import { Streetlight } from '../models/streetlight';
import { FilterPipe } from '../pipes/filter.pipe';
import { Observable } from 'rxjs';
import { GoogleMap } from '@agm/core/services/google-maps-types';
import { v } from '@angular/core/src/render3';
import value from '*.json';
import {_} from 'underscore';

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
  styleUrls: ['./map-view.component.scss'],
  providers: [GoogleMapsAPIWrapper]
})

export class MapViewComponent implements OnInit {

  wattageOptions = [];
  poleOwnerOptions = [];

  title = 'Streetlights';
  lat: number;
  lng: number;
  zoom = 15;
  minZoom = 3;
  maxZoom = 50;
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
  @ViewChild('AgmMap') agmMap: AgmMap;
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
      { label: 'Lees Summit', value: 'Lees Summit' },
      { label: 'MODL', value: 'MODL' },
      { label: 'KCPL', value: 'KCPL' },
      { label: 'VeVoo', value: 'VeVoo' }
    ];
  }
  pageNo: number;
  size: number;


  ngOnInit() {
    this.pageNo = 1;
    this.size = 500;

    this.clearFilters();
    //this.getStreetlights();
    this.setCurrentLocation();
    //this.loadMarkersInBounds();

  }

  /* Methods */

  // Populate the streetlight map marker data
  getStreetlights() {
    this.service.getStreetlights(this.pageNo, this.size).subscribe(streetlights => {
      streetlights['streetlights'].map(streetlight => {
        const m = new Marker();
        m.setPoleId(streetlight.poleID);
        m.setLng(streetlight.longitude);
        m.setLat(streetlight.latitude);
        m.setLabel(streetlight.poleID);
        m.setWireless(streetlight.fiberWifiEnabled);
        m.setPoleOwner(streetlight.poleOwner);
        m.setAttachedTech(streetlight.attachedTech);
        m.setWattage(streetlight.wattage);
        m.setLightBulbType(streetlight.lightbulbType);
        this.streetlightMarkers.push(m);
        this.filteredStreetlightMarkers.push(m);
      });
    });
  };

  ngAfterViewInit() {
    //   this.agmMap.mapReady.subscribe(map => {
    //     const bounds: LatLngBounds = new google.maps.LatLngBounds();
    //     for (const mm of this.streetlightMarkers) {
    //       bounds.extend(new google.maps.LatLng(mm.lat, mm.lon));
    //     }
    //     map.fitBounds(bounds);
    //   });
    //   console.log(this.agmMap);
   
    console.log(this.agmMap);

  }

  // Predicate function for filter
  filter(): Marker[] {
    let filteredMarkers = [];

    if (this.poleIdFilter !== null) {
      filteredMarkers = this.filteredStreetlightMarkers.filter((m) => m.poleID.indexOf(this.poleIdFilter) > -1);
    } else {
      filteredMarkers = this.streetlightMarkers;
    }

    let subSetMarkers = [];
    // Applies any filters that have been set if any
    if (Object.keys(this.filters).length > 0) {
      console.dir(this.filters);
      subSetMarkers = _.where(filteredMarkers, this.filters);
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
    if (value!=null) {
      this.filters[prop] = `${value}`;
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
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(position);
        //this.zoom = 15;
      })
    }
  }
  loadMarkersInBounds(bounds: LatLngBounds) {
    var nE = bounds.getNorthEast();
    var sW = bounds.getSouthWest();
    var west = sW.lng();
    var east = nE.lng();
    var south = sW.lat();
    var north = nE.lat();
    this.agmMap.idle.subscribe(()=> this.getGeoMarkers(west, east, south, north))
  }
  getGeoMarkers(west: number, east: number, south: number, north: number) {
    this.service.getMapStreetlights(west, east, south, north).subscribe(streetlights => {
      streetlights['streetlights'].map(streetlight => {
        const m = new Marker();
        m.setPoleId(streetlight.poleID);
        m.setLng(streetlight.longitude);
        m.setLat(streetlight.latitude);
        m.setLabel(streetlight.poleID);
        m.setWireless(streetlight.fiberWifiEnabled);
        m.setPoleOwner(streetlight.poleOwner);
        m.setAttachedTech(streetlight.attachedTech);
        m.setWattage(streetlight.wattage);
        m.setLightBulbType(streetlight.lightbulbType);
        if (this.streetlightMarkers.indexOf(m)===-1){
          this.streetlightMarkers.push(m);
        }
      });
    });
    this.filteredStreetlightMarkers = this.streetlightMarkers
    this.applyFilters();    
  }

}

