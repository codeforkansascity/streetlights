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

  constructor(private mapService: MapService) {
    this.streetlightMarkers = [];
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
          this.streetlightMarkers.push(m);
          // console.log(this.streetlightMarkers[-1]);
        });
      });
      // this.mapService.getStreetlights().subscribe( markers => this.streetlightMarkers = markers);
    });
  }

}
