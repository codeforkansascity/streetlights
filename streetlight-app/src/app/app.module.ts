import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { LogService } from './shared/log.service';
import { MapViewComponent } from './map-view/map-view.component';
import { SpreadsheetViewComponent } from './spreadsheet-view/spreadsheet-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MapService } from './map.service';


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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFqlFSX0ZkuDrZoRp3Zmdj5P5AKWzlrAY'
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ LogService, MapService ],
  declarations: [ AppComponent, MapViewComponent, SpreadsheetViewComponent, PageNotFoundComponent ],
  exports: [ MapViewComponent, SpreadsheetViewComponent, PageNotFoundComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
