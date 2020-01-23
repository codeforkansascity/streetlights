import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StreetlightService } from '../../services/streetlight.service';
import { Streetlight } from '../models/streetlight';
import { Observable } from 'rxjs';
import {DataViewModule} from 'primeng/dataview'

@Component({
  selector: 'app-landing-view',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  lumenOptions = [
    { label: '', value: null },
    { label: '1000', value: 1000 },
    { label: '1125', value: 1125 },
    { label: '1300', value: 1300 },
    { label: '1425', value: 1425 }
  ];

  // Data source
  streetlights = [];
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
  state: object;
  pageNo: number;
  size: number;
  rows: number;
  totalRecords: number;
  loading:boolean



  constructor(private service: StreetlightService,
              private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loading = false
    this.service.getCount().subscribe((value) => {
      this.totalRecords = value
    })
    //Collect Streetlight data through API call
    var streetlightResults = this.service.getStreetlights( 0, 100);
    streetlightResults.subscribe((value) => {
      this.streetlights = value['streetlights'];
      this.currentStreetlight = this.streetlights[0];
    }, (error) => {
      console.error('LandingViewComponent::ngOnInit::Error: Failed to retrieve streetlight data.');
    });

  }

  onDataViewItemClick(poleId: string) {
    console.dir(poleId);
    this.currentStreetlight = this.streetlights.find(value =>
      value.poleID === poleId);
  }
  loadData(event) {

    console.log(event)
    this.pageNo = event.first;
    this.rows = event.rows;
    this.loading = true;
    this.service.getStreetlights(this.pageNo, this.rows).subscribe(data => {
      this.streetlights = data['streetlights'];
      this.loading = false;
      this._cdr.detectChanges();
      this.currentStreetlight=this.streetlights[0];
    })
  }
}
