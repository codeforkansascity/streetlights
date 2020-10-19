import { Component, OnInit } from '@angular/core';
import { StreetlightService } from '../../services/streetlight.service';
import { SelectItem } from '../models/select-item';
import { Streetlight } from '../models/streetlight';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-spreadsheet-view',
  templateUrl: './spreadsheet-view.component.html',
  styleUrls: ['./spreadsheet-view.component.scss']
})
export class SpreadsheetViewComponent implements OnInit {

  cols: any[];
  selectedColumns: any[];
  wattageOptions: SelectItem[];
  poleOwnerOptions: SelectItem[];
  wattageTimeout: any;
  currentWattage: number;
  // Table data source
  streetlights = [];
  pageNo: number;
  size: number;
  rows: number;
  totalRecords: number;
  timeout: number = 1500;
  currentStreetlight: Streetlight = {
    _id: null,
    poleID: null,
    longitude: null,
    latitude: null,
    lightbulbType: null,
    wattage: null,
    lumens: null,
    attachedTech: null,
    poleOwner: null,
    dataSource: null,
    fiberWifiEnabled: null,
    lightAttributes: null,
    poleType: null
  };
  visible: boolean = false;
  target: any;
  display: boolean = false;

  constructor(private service: StreetlightService) { }

  ngOnInit() {
    this.service.getCount().subscribe((value) => {
      this.totalRecords = value;
      this.collectAPIData();
    })

    // Set up dropdown listings
    const wattagesResults = this.service.getWattageOptions();
    wattagesResults.subscribe((value) => {
      this.wattageOptions = value['wattageOptions'];
    }, (error) => {
      console.error('SpreadsheetViewComponent::ngOnInit::Error: Failed to retrieve wattageOptions.');
    });

    const poleOwnerResults = this.service.getPoleOwner();
    poleOwnerResults.subscribe((value) => {
      this.poleOwnerOptions = value['poleOwnerOptions'];
    }, (error) => {
      console.error('SpreadsheetViewComponent::ngOnInit::Error: Failed to retrieve poleOwnerOptions.');
    });

    // Set up table
    this.cols = [
      { field: 'poleID', header: 'Pole ID', filtermatchmode: 'contains' },
      { field: 'latitude', header: 'Lat', filtermatchmode: 'contains' },
      { field: 'longitude', header: 'Long', filtermatchmode: 'contains' },
      { field: 'wattage', header: 'Wattage', filtermatchmode: 'equals' },
      { field: 'attachedTech', header: 'Attached Tech', filtermatchmode: 'equals' },
      { field: 'poleOwner', header: 'Pole Owner', filtermatchmode: 'equals' },
      { field: 'lightAttributes', header: 'Attributes', filtermatchmode: 'contains' },
    ];
    this.selectedColumns = this.cols;
  }

  // Collect Streetlight data through API call
  collectAPIData() {
    const streetlightResults = this.service.getStreetlights(0, 500); //  TODO loading only 500 record for testing
    // const streetlightResults = this.service.getStreetlights(0, this.totalRecords); 
    streetlightResults.subscribe((value) => {
      this.streetlights = value['streetlights'];
      this.currentStreetlight = this.streetlights[0];
    }, (error) => {
      console.error('SpreadsheetViewComponent::ngOnInit::Error: Failed to retrieve streetlight data.');
    });
  }

  onPoleIDChange(event, dt) {
    if (event.target.value !== null) {
      setTimeout(() => {
        dt.filter(event.target.value, 'poleID', 'contains');
      }, this.timeout);
    } else {
      dt.filter(null, 'poleID', null);
    }
  }

  onLatitudeChange(event, dt) {
    if (event.target.value !== null) {
      setTimeout(() => {
        dt.filter(event.target.value, 'latitude', 'contains');
      }, this.timeout);
    } else {
      dt.filter(null, 'latitude', null);
    }
  }

  onLongitudeChange(event, dt) {
    if (event.target.value !== null) {
      setTimeout(() => {
        dt.filter(event.target.value, 'longitude', 'contains');
      }, this.timeout);
    } else {
      dt.filter(null, 'longitude', null);
    }
  }

  onWattageChange(event, dt) {
    if (event.value !== null) {
      dt.filter(event.value, 'wattage', 'equals');
    } else {
      dt.filter(null, 'wattage', null);
    }
  }

  onAttachedTechChange(event, dt) {
    if (event.value !== null) {
      dt.filter(event.value, 'attachedTech', 'equals');
    } else {
      dt.filter(null, 'attachedTech', null);
    }
  }

  onPoleOwnerChange(event, dt) {
    if (event.value !== null) {
      dt.filter(event.value, 'poleOwner', 'equals');
    } else {
      dt.filter(null, 'poleOwner', null);
    }
  }

  onLightAttributesChange(event, dt) {
    if (event.target.value !== null) {
      setTimeout(() => {
        dt.filter(event.target.value, 'lightAttributes', 'contains');
      }, this.timeout);
    } else {
      dt.filter(null, 'lightAttributes', null);
    }
  }

  loadStreetlightsLazy(event) {
    this.pageNo = event.first;
    this.rows = event.rows;
    this.service.getStreetlights(this.pageNo, this.rows)
      .subscribe(
        data => {
          this.streetlights = data['streetlights'];
        }
      );
    this.currentStreetlight = this.streetlights[0];
  }

  // Overlay panel functions
  showStreetlightDetails(event, streetlight: Streetlight, overlaypanel: OverlayPanel) {
    this.currentStreetlight = streetlight;
    overlaypanel.toggle(event);
  }

  hideOverlayPanel(overlaypanel: OverlayPanel) {
    overlaypanel.hide();
  }

}
