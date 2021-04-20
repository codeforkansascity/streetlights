import { Component, OnInit, ViewChild, NgZone,  } from '@angular/core';
import {  AgmMap,  GoogleMapsAPIWrapper,  LatLngBounds } from '@agm/core';
import { AgmMarkerCluster, ClusterManager } from '@agm/js-marker-clusterer';
import { StreetlightService } from '../../services/streetlight.service';
import { map } from 'rxjs/operators';
import { Marker } from '../models/marker';
import { LogService } from '../shared/log.service';
import { Streetlight } from '../models/streetlight';
import { FilterPipe } from '../pipes/filter.pipe';
import { Observable } from 'rxjs';
import { v } from '@angular/core/src/render3';
import value from '*.json';
import {_} from "../../../node_modules/underscore";


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
  providers: [GoogleMapsAPIWrapper,ClusterManager]
})

export class MapViewComponent implements OnInit {

  wattageOptions = [];
  poleOwnerOptions = [];

  title = 'Streetlights';
  lat: number;
  lng: number;
  zoom = 20;
  minZoom = 3;
  maxZoom = 50;
  minCluster = 5;
  mapDraggable = true;
  streetlightMarkers: Marker[];
  cachedList: Streetlight[];
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
  openedWindow: number = 0;
  @ViewChild('AgmMap') agmMap: AgmMap;
  clusterManager: ClusterManager;
  filters = {};
  lastSelectedInfoWindow: any;
  constructor(private logger: LogService, private service: StreetlightService, private _clusterManager:ClusterManager, private ngZone:NgZone) {
    this.streetlightMarkers = [];
    this.filteredStreetlightMarkers = [];
    // Set up dropdown listings
    this.wattageOptions = [];
    //this.clusterManager = new ClusterManager(this.agmMap.,ngZone);

    this.poleOwnerOptions = [];
  }
  pageNo: number;
  size: number;
  selectedMarker:Marker;
  private debounceTimer = null;


  ngOnInit() {
    this.pageNo = 1;
    this.size = 500;
    this.service.getWattageOptions().subscribe(data => { this.wattageOptions = data['wattageOptions'] });
    this.service.getPoleOwner().subscribe(data => { this.poleOwnerOptions = data['poleOwnerOptions'] })
    this.clearFilters();
    this.setCurrentLocation();
    this.service.getList().subscribe(res=>this.cachedList = res);
    console.log(this.cachedList);
  }

  /* Methods */

  // openWindow(poleID: number) {
    
  //   this.openedWindow = poleID; // alternative: push to array of numbers
  // }

  isInfoWindowOpen(poleID: number) {
    return this.openedWindow == poleID; // alternative: check if id is in array
  }
  openWindow(infoWindow: any, marker:Marker){
    if(infoWindow==this.lastSelectedInfoWindow!=null){
      try{
        this.lastSelectedInfoWindow.close();
      }catch{}
    }
    this.lastSelectedInfoWindow = infoWindow;
    this.selectedMarker = marker;
  }
  

    // Populate the streetlight map marker data
  // getStreetlights() {
  //   this.service.getStreetlights(this.pageNo, this.size).subscribe(streetlights => {
  //     streetlights['streetlights'].map((streetlight: { _id: string; poleID: string; longitude: number; latitude: number;
  //        fiberWifiEnabled: boolean; poleOwner: string; attachedTech: any; wattage: number; lightbulbType: string; }) => {
  //       const m = new Marker();
  //       m.set_id(streetlight._id);
  //       m.setPoleId(streetlight.poleID);
  //       m.setLng(streetlight.longitude);
  //       m.setLat(streetlight.latitude);
  //       m.setWireless(streetlight.fiberWifiEnabled);
  //       m.setPoleOwner(streetlight.poleOwner);
  //       m.setAttachedTech(streetlight.attachedTech);
  //       m.setWattage(streetlight.wattage);
  //       m.setLightBulbType(streetlight.lightbulbType);
  //       this.streetlightMarkers.push(m);
  //       this.filteredStreetlightMarkers.push(m);
  //     });
  //   });
  // };

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
    if (value != null) {
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
      })
    }
  }

  loadMarkersInBounds(bounds: LatLngBounds) {
    if (this.debounceTimer!==null){
      clearTimeout(this.debounceTimer);
      this.debounceTimer=null;
    }
    this.debounceTimer = setTimeout(()=>{
      var nE = bounds.getNorthEast();
      var sW = bounds.getSouthWest();
      var west = sW.lng();
      var east = nE.lng();
      var south = sW.lat();
      var north = nE.lat();
      this.filteredStreetlightMarkers = [];
      //this.agmMap.idle.subscribe(() => this.getGeoMarkers(west, east, south, north))
      this.getGeoMarkers(west, east, south,north);  
    },200)
  }
 

  getGeoMarkers(west: number, east: number, south: number, north: number) {
    this.streetlightMarkers = [];
    this.clearFilters();
    this.service.getMapStreetlights(west, east, south, north).subscribe(streetlights => {
      streetlights['streetlights'].map((streetlight: { _id: string; poleID: string; longitude: number; 
        latitude: number; fiberWifiEnabled: boolean; poleOwner: string; attachedTech: any; wattage: number; lightbulbType: string; }) => {
        const m = new Marker();
        m.set_id(streetlight._id);
        m.setLng(streetlight.longitude);
        m.setLat(streetlight.latitude);
        m.setLabel(streetlight.poleID);
        m.setWireless(streetlight.fiberWifiEnabled);
        m.setPoleOwner(streetlight.poleOwner);
        m.setAttachedTech(streetlight.attachedTech);
        m.setWattage(streetlight.wattage);
        m.setLightBulbType(streetlight.lightbulbType);
        if (this.streetlightMarkers.indexOf(m) === -1) {
          this.streetlightMarkers.push(m);
        }
        // this.streetlightMarkers.forEach(element => {
        //   if(m.poleID!==element.poleID)
        //   this.streetlightMarkers.push(m);
        // });
      });
    });    
    this.applyFilters();
  }
  
}

