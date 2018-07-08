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
  wattageTimeout: any;
  currentWattage: number;
  // Table data source
  streetlights = [];



  constructor( private service: StreetlightService ) { }

  ngOnInit() {

    // Collect Streetlight data through API call
    const streetlightResults = this.service.getStreetlights();
    streetlightResults.subscribe((value) => {
      this.streetlights = value;
    }, (error) => {
      console.error('SpreadsheetViewComponent::ngOnInit::Error: Failed to retrieve streetlight data.');
    });

    // Set up table
    this.cols = [
      { field: 'poleID', header: 'Pole ID', filtermatchmode: 'contains' },
      { field: 'latitude', header: 'Lat', filtermatchmode: 'equals' },
      { field: 'longitude', header: 'Long', filtermatchmode: 'equals' },
      { field: 'wattage', header: 'Wattage', filtermatchmode: 'equals'},
      { field: 'attachedTech', header: 'Attached Tech', filtermatchmode: 'equals' },
      { field: 'poleOwner', header: 'Pole Owner', filtermatchmode: 'contains' },
      { field: 'lightAttributes', header: 'Attributes', filtermatchmode: 'contains' },
    ];
    this.selectedColumns = this.cols;
  }

  onWattageChange(event, dt) {
    this.currentWattage = event;
    if (this.wattageTimeout) {
      clearTimeout(this.wattageTimeout);
    }

    this.wattageTimeout = setTimeout(() => {
      dt.filter(event, 'wattage', 'gt');
    }, 250);
  }

  onAttachedTechChange(event, dt) {
    console.log(event.value);
    if (event.value !== null) {
      dt.filter(event.value, 'attachedTech', 'equals');
    } else {
      dt.filter(null, 'attachedTech', null);
    }

  }

}
