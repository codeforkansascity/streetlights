import { Component, OnInit } from '@angular/core';
import { StreetlightService } from '../../services/streetlight.service';

@Component({
  selector: 'app-spreadsheet-view',
  templateUrl: './spreadsheet-view.component.html',
  styleUrls: ['./spreadsheet-view.component.css']
})
export class SpreadsheetViewComponent implements OnInit {

  cols: any[];
  selectedColumns: any[];
  lumenOptions = [
    { label: '', value: null },
    { label: '1000', value: 1000 },
    { label: '1125', value: 1125 },
    { label: '1300', value: 1300 },
    { label: '1425', value: 1425 }
  ];
  // Table data source
  streetlights = [];


  constructor( private service: StreetlightService ) { }

  ngOnInit() {

    // Collect Streetlight data through API call
    const streetlightResults = this.service.getStreetlights();
    streetlightResults.subscribe((value) => {
      this.streetlights = value;
      console.dir(this.streetlights);
    }, (error) => {
      console.error('SpreadsheetViewComponent::ngOnInit::Error: Failed to retrieve streetlight data.');
    });

    // Set up table
    this.cols = [
      { field: 'poleId', header: 'Pole ID', filtermatchmode: 'contains' },
      { field: 'latitude', header: 'Lat', filtermatchmode: 'equals' },
      { field: 'longitude', header: 'Long', filtermatchmode: 'equals' },
      { field: 'lightbulbType', header: 'Bulb Type', filtermatchmode: 'contains' },
      { field: 'wattage', header: 'Wattage', filtermatchmode: 'equals'},
      { field: 'lumens', header: 'Lumens', filtermatchmode: 'equals' },
      { field: 'attachedTech', header: 'Attached Tech', filtermatchmode: 'equals' },
      { field: 'poleOwner', header: 'Pole Owner', filtermatchmode: 'contains' },
      { field: 'dataSource', header: 'Data Source', filtermatchmode: 'contains' },
      { field: 'fiberWifiEnabled', header: 'Wi-fi', filtermatchmode: 'contains' },
      { field: 'lightAttributes', header: 'Attributes', filtermatchmode: 'contains' },
      { field: 'poleType', header: 'Pole Type', filtermatchmode: 'contains' }
    ];
    this.selectedColumns = this.cols;
  }

}
