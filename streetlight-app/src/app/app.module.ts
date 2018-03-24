// Core
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { TableModule } from 'primeng/table';
import { GMapModule } from 'primeng/gmap';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

// Google Map Service
import { AgmCoreModule } from '@agm/core';

// Custom
import { LogService } from './shared/log.service';
import { MapViewComponent } from './map-view/map-view.component';
import { SpreadsheetViewComponent } from './spreadsheet-view/spreadsheet-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StreetlightService } from '../services/streetlight.service';


const appRoutes: Routes = [
  { path: 'map-view', component: MapViewComponent },
  { path: 'spreadsheet-view',      component: SpreadsheetViewComponent },
  { path: '',
    redirectTo: 'map-view',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    GMapModule,
    CheckboxModule,
    DropdownModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
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
