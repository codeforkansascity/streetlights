// Core
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNg
import { TableModule } from 'primeng/table';
import { GMapModule } from 'primeng/gmap';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { FlexLayoutModule } from '@angular/flex-layout';


// Google Map Service
import { AgmCoreModule } from '@agm/core';

// Custom
import { LogService } from './shared/log.service';
import { MapViewComponent } from './map-view/map-view.component';
import { SpreadsheetViewComponent } from './spreadsheet-view/spreadsheet-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StreetlightService } from '../services/streetlight.service';
import { LandingComponent } from './landing/landing.component';


const appRoutes: Routes = [
  { path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    ButtonModule,
    FlexLayoutModule,
    BrowserModule,
    HttpClientModule,
    MultiSelectModule,
    FormsModule,
    TableModule,
    GMapModule,
    CheckboxModule,
    DropdownModule,
    DataViewModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFqlFSX0ZkuDrZoRp3Zmdj5P5AKWzlrAY'
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ LogService, StreetlightService ],
  declarations: [ AppComponent, MapViewComponent, SpreadsheetViewComponent, PageNotFoundComponent, LandingComponent ],
  exports: [ MapViewComponent, SpreadsheetViewComponent, PageNotFoundComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
