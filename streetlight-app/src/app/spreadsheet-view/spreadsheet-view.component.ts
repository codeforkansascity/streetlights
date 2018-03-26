import { Component, OnInit } from '@angular/core';
import { StreetlightService } from '../../services/streetlight.service';

@Component({
  selector: 'app-spreadsheet-view',
  templateUrl: './spreadsheet-view.component.html',
  styleUrls: ['./spreadsheet-view.component.css']
})
export class SpreadsheetViewComponent implements OnInit {

  // Table data source
  streetlights = [];
  cols = [
    { field: 'poleId', header: 'Pole ID', filtermatchmode: 'contains' },
    { field: 'logitude', header: 'Logitude', filtermatchmode: 'contains' },
    { field: 'latitude', header: 'Lat', filtermatchmode: 'equals' },
    { field: 'longitude', header: 'Long', filtermatchmode: 'equals' },
    { field: 'lightBulbType', header: 'Bulb Type', filtermatchmode: 'contains' },
    { field: 'wattage', header: 'Wattage', filtermatchmode: 'equals'},
    { field: 'lumens', header: 'Lumens', filtermatchmode: 'equals' },
    { field: 'attachedTech', header: 'Attached Tech', filtermatchmode: 'equals' },
    { field: 'poleOwner', header: 'Pole Owner', filtermatchmode: 'contains' },
    { field: 'dataSource', header: 'Data Source', filtermatchmode: 'contains' },
    { field: 'fiberWifiEnabled', header: 'Wi-fi', filtermatchmode: 'contains' },
    { field: 'lightAttributes', header: 'Attributes', filtermatchmode: 'contains' },
    { field: 'poleType', header: 'Pole Type', filtermatchmode: 'contains' }
  ];

  constructor( private service: StreetlightService ) { }

  ngOnInit() {
    const streetlightResults = this.service.getStreetlights();
    streetlightResults.subscribe((value) => {
      this.streetlights = value;
    }, (error) => {
      console.error('SpreadsheetViewComponent::ngOnInit::Error: Failed to retrieve streetlight data.');
    });
  }

}
