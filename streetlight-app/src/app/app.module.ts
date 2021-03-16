// Core
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNg
import { TableModule } from 'primeng/table';
import { GMapModule } from 'primeng/gmap';
import { CheckboxModule } from 'primeng/checkbox';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayPanelModule } from 'primeng/overlaypanel';


// Google Map Service
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

// Custom
import { LogService } from './shared/log.service';
import { MapViewComponent } from './map-view/map-view.component';
import { SpreadsheetViewComponent } from './spreadsheet-view/spreadsheet-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StreetlightService } from '../services/streetlight.service';
import { LandingComponent } from './landing/landing.component';
import { FilterPipe } from './pipes/filter.pipe';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '',
    component: LandingComponent,
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
    SliderModule,
    FormsModule,
    TableModule,
    GMapModule,
    CheckboxModule,
    TriStateCheckboxModule,
    DropdownModule,
    DataViewModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFqlFSX0ZkuDrZoRp3Zmdj5P5AKWzlrAY'
    }),
    AgmJsMarkerClustererModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    OverlayPanelModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [LogService, StreetlightService],
  declarations: [AppComponent, MapViewComponent, SpreadsheetViewComponent, PageNotFoundComponent, LandingComponent, FilterPipe, 
  ],
  exports: [MapViewComponent, SpreadsheetViewComponent, PageNotFoundComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
