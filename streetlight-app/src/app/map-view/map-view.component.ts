import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MapService } from '../map.service';
import { Marker } from '../marker';


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

  }

  ngOnInit() {
    this.getStreetlights();
  }

  getStreetlights(): void {
    this.mapService.getStreetlights().subscribe(markers => this.streetlightMarkers = markers);
  }

}
