import { Component, OnInit } from '@angular/core';
import { StreetlightService } from '../../services/streetlight.service';
import { SelectItem } from '../models/select-item';

@Component({
  selector: 'app-spreadsheet-view',
  templateUrl: './spreadsheet-view.component.html',
  styleUrls: ['./spreadsheet-view.component.scss']
})
export class SpreadsheetViewComponent implements OnInit {

  cols: any[];
  selectedColumns: any[];

  lumenOptions = [
    { label: '', value: null },
    { label: '1000', value: '1000' },
    { label: '1125', value: '1125' },
    { label: '1300', value: '1300' },
    { label: '1425', value: '1425' }
  ];

  wattageOptions: SelectItem[];
  poleOwnerOptions: SelectItem[];

  wattageTimeout: any;
  currentWattage: number;
  // Table data source
  streetlights = [];
  pageNo: number;
  size: number;



  constructor( private service: StreetlightService ) { }

  ngOnInit() {

    // Set up dropdown listings
    this.wattageOptions = [
      { label: '', value: null },
      { label: '100', value: '100' },
      { label: '150', value: '150' },
      { label: '175', value: '175' },
      { label: '250', value: '250' },
      { label: '400', value: '400' },
    ];

    this.poleOwnerOptions = [
      { label: '', value: null },
      { label: "Lee's Summit", value: 'Lee Summit'}
    ];


    // Collect Streetlight data through API call
  
    const streetlightResults = this.service.getStreetlights(this.pageNo = 1, this.size = 500);
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
    console.log(event);
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
