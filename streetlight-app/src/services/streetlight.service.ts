import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable ,  of, Subscription } from 'rxjs';
import { catchError, map, publishReplay, refCount, shareReplay, tap } from 'rxjs/operators';
import {Streetlight, StreetlightData} from '../app/models/streetlight';
import value, * as data from './data.json';
import { ReturnStatement } from '@angular/compiler';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
};
@Injectable({
  providedIn: 'root',
})

export class StreetlightService {
  
  //private dataUrl = 'http://localhost:5000/api';
  private dataUrl = 'http://streetlights.codeforkc.org/api';
  private streetlightsUrl = this.dataUrl + '/streetlights';

  streetlights: Observable<Streetlight[]>;
  total;

  constructor( private http: HttpClient ) {

  }


//   private extractData(res:Response):Streetlight[]{
//     let body = res;
//     return body || {};
//   }
//   /**
//    * Request streetlight data from API
//    */
//   getStreetlights(): Observable<Streetlight[]> {
//     return this.http.get<Streetlight>(this.mapsUrl).pipe(
//       // map(streetlightData => streetlightData.streetlights))
//       map(this.extractData));
//       // .pipe( 
//       //   catchError(this.handleError('getStreetlights', []))
//       // );
//   }
// getStreetlight(id): Observable<any>{
//   return this.http.get(this.mapsUrl+id).pipe(
//     map(this.extractData)
//   )
// }

// /**
//  * Handle Http operation that failed.
//  * Let the app continue.
//  * @param operation - name of the operation that failed
//  * @param result - optional value to return as the observable result
//  */
//   private handleError<T> (operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {

//       // TODO: send the error to remote logging infrastructure
//       console.error(error); // log to console instead

//       // TODO: better job of transforming error for user consumption
//       // this.log(`${operation} failed: ${error.message}`);

//       // Let the app keep running by returning an empty result.
//       return of(result as T);
//     };
//   }
/**
   * Request streetlight data from API
   */
  getStreetlights(pageNum: number, size: number): Observable<Streetlight[]> {
    var pageQuery = `pageNo=${pageNum}`
    var sizeQuery = `size=${size}`
    return this.http.get<Streetlight[]>(`${this.streetlightsUrl}?${pageQuery}&${sizeQuery}`)
      // .pipe(
      //   catchError(this.handleError('getStreetlights', []))
      // );
  }
  getStreetlight(id:number):Observable <Streetlight>{
    return this.http.get<Streetlight>(`${this.streetlightsUrl}/${id}`)
  }

  getCount():Observable<number>{
    return this.http.get<number>(`${this.streetlightsUrl}/count`)
  }

  getMapStreetlights(lowLong: number, hiLong:number,lowLat:number, hiLat:number): Observable<Streetlight[]>{
    var query = `west=${lowLong}&east=${hiLong}&south=${lowLat}&north=${hiLat}`
   return this.http.get<Streetlight[]>(`${this.streetlightsUrl}/markers?${query}`)
  }

  getWattageOptions(){
    return this.http.get(this.dataUrl + '/wattageOptions')
  }
  getPoleOwner(){
    return this.http.get(this.dataUrl+'/poleOwnerOptions')
  }
  getCachedStreetlights():Observable<Streetlight[]>{
    if(!this.streetlights){
      var tempArray = new Array<Streetlight>()
      let totalSub:Subscription = this.getCount().subscribe((result:number)=>{this.total = result});
      var sizeQuery = 1000;
      var skip = 0;
      var pageCount = this.total/sizeQuery;
      while(skip<=pageCount){
        this.streetlights = this.getStreetlights(skip,sizeQuery).pipe(map(data=>tempArray.concat(data))),
        publishReplay(1),
        refCount()
        skip++;
      }
      return this.streetlights;
    }
  }

 

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
