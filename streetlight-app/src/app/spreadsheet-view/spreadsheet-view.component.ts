import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-spreadsheet-view',
  templateUrl: './spreadsheet-view.component.html',
  styleUrls: ['./spreadsheet-view.component.css']
})
export class SpreadsheetViewComponent implements OnInit {

  // Table data source
  streetlights = [];
  cols = [
    { field: 'id', header: 'ID', filtermatchmode: 'equals' },
    { field: 'lat', header: 'Lat', filtermatchmode: 'equals' },
    { field: 'lon', header: 'Long', filtermatchmode: 'equals' },
    { field: 'street', header: 'Street', filtermatchmode: 'contains' },
    { field: 'zip', header: 'Zip', filtermatchmode: 'equals'},
    { field: 'nema', header: 'NEMA', filtermatchmode: 'equals' },
    { field: 'wireless', header: 'Wi-fi', filtermatchmode: 'equals' },
    { field: 'fixture_mfg', header: 'Fixture Mfg', filtermatchmode: 'contains' }
  ];

  // Table filters
  nemaFilter: boolean;
  wifiFilter: boolean;


  constructor( private service: MapService ) { }

  ngOnInit() {
    const streetlightResults = this.service.getStreetlights();
    streetlightResults.subscribe((value) => {
      this.streetlights = value;
      console.dir(this.streetlights);
    }, (error) => {
      console.error('SpreadsheetViewComponent::ngOnInit::Error: Failed to retrieve streetlight data.');
    });
  }

}
