import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';
import { HealthService } from './health.service';
import { State } from '../model/state'
@Injectable({
  providedIn: 'root'
})
export class StateService {
  

  constructor(private http: HttpClient, private health: HealthService) { }
  private statesUrl = 'api/states';

   /** GET locatons from the server */
   getStates (): Observable<State[]> {
    return this.http.get<State[]>(this.statesUrl)
      .pipe(
        tap(states => {  this.health.log('fetched states', states) }),
        catchError(this.handleError('getStates', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
        this.health.log(`${operation} failed : ${error.message}`, error)
        return of(result as T)
    }
  }
}

