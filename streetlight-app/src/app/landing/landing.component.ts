import { Component, OnInit } from '@angular/core';
import { StreetlightService } from '../../services/streetlight.service';
import { Streetlight } from '../models/streetlight';
import { Observable } from 'rxjs';

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
    poleID: null,
    longitude: null,
    Latitude: null,
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

  constructor( private service: StreetlightService ) { }

  ngOnInit() {

    // Collect Streetlight data through API call
    const streetlightResults = this.service.getStreetlights();
    streetlightResults.subscribe((value) => {
      //console.log(value['streetlights']);
      this.streetlights = value.streetlights;
      this.currentStreetlight = this.streetlights[0];
    }, (error) => {
      console.error('LandingViewComponent::ngOnInit::Error: Failed to retrieve streetlight data.');
    });

  }
// getStreetlights() : Observable<Streetlight[]>{
//   const streetlightResults = this.service.getStreetlights();
//     streetlightResults.subscribe((value:{}) => {
//       console.log(value);
//       this.streetlights = value;
//       this.currentStreetlight = this.streetlights[0];
//     }, (error) => {
//       console.error('LandingViewComponent::ngOnInit::Error: Failed to retrieve streetlight data.');
//     });
// }

  onDataViewItemClick(poleId: string) {
    //console.dir(poleId);
    this.currentStreetlight = this.streetlights.find(value =>
      value.poleID === poleId);
  }

}
