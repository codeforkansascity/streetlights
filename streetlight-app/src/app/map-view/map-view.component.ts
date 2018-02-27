import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MapService } from '../map.service';
import { Marker } from '../marker';
import { Promise } from 'q';


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
  currentStreetlightMarkers: Marker[];
  nema: boolean = false;;
  wireless: boolean = false;;
  fixture: string;
  filter: Marker = new Marker();

  constructor(private mapService: MapService) {
    this.streetlightMarkers = [];
    this.currentStreetlightMarkers = [];
  }

  ngOnInit() {
    this.getStreetlights();
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
          this.currentStreetlightMarkers.push(m);
          
        });
        console.log(this.currentStreetlightMarkers);
      });
      
    });
  }

  filterStreetlights(param: 'nema' | 'wireless' | 'fixture_mfg' | 'none', value?: string | boolean ) {
    
    this.streetlightMarkers.forEach((marker) => {
      if (param === 'nema' && value) {
        if(!marker.nema) { 
          marker.setVisible(false); 
        }
        else { 
          marker.setVisible(true)
        };
      } 
  
      if (param === 'wireless' && value) {
        if(!marker.wireless) {
          marker.setVisible(false);
        } else {
          marker.setVisible(true);
        }
      };
  
      if (param === 'fixture_mfg' && typeof value === 'string' && value.length > 0) {
        if (marker.fixture_mfg !== value) {
          marker.setVisible(false);
        } else {
          marker.setVisible(true);
        }
      }

      if (param === 'none') {
        marker.setVisible(true);
      }
    });
    
    

  }

}
