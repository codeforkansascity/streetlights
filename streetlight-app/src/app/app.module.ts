// Core
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { GMapModule } from 'primeng/gmap';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonModule } from 'primeng/button';

// Google Map Service
import { AgmCoreModule } from '@agm/core';

// Custom
import { LogService } from './shared/log.service';
import { MapViewComponent } from './map-view/map-view.component';
import { SpreadsheetViewComponent } from './spreadsheet-view/spreadsheet-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StreetlightService } from '../services/streetlight.service';


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
    FormsModule,
    TableModule,
    GMapModule,
    CheckboxModule,
    DropdownModule,
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
  declarations: [ AppComponent, MapViewComponent, SpreadsheetViewComponent, PageNotFoundComponent ],
  exports: [ MapViewComponent, SpreadsheetViewComponent, PageNotFoundComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
