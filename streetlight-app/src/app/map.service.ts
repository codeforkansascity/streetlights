import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Marker } from './marker';

@Injectable()
export class MapService {

  constructor( private http: HttpClient ) { 

  }

  getStreetlights(): Observable<Marker[]> {
    return this.http.get<Marker[]>('https://my.api.mockaroo.com/streetlights.json?key=08931ac0');
  }

}
