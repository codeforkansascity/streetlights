import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';

import { MapViewComponent } from './map-view/map-view.component';
import { SpreadsheetViewComponent } from './spreadsheet-view/spreadsheet-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


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
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFqlFSX0ZkuDrZoRp3Zmdj5P5AKWzlrAY'
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  declarations: [ AppComponent, MapViewComponent, SpreadsheetViewComponent, PageNotFoundComponent ],
  exports: [ MapViewComponent, SpreadsheetViewComponent, PageNotFoundComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
