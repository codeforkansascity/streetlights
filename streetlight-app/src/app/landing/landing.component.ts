import { Component, OnInit } from '@angular/core';
import { StreetlightService } from '../../services/streetlight.service';

@Component({
  selector: 'app-landing-view',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
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

  constructor( private service: StreetlightService ) { }

  ngOnInit() {

    // Collect Streetlight data through API call
    const streetlightResults = this.service.getStreetlights();
    streetlightResults.subscribe((value) => {
      this.streetlights = value;
    }, (error) => {
      console.error('LandingViewComponent::ngOnInit::Error: Failed to retrieve streetlight data.');
    });

  }

}
