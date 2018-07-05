import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class ServerService {
  constructor(private _httpClient: HttpClient) {}

  postData(servers: any[]): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; testing-header');
    return this._httpClient.post('https://test-1-723c2.firebaseio.com/data.json', servers,
      {headers: headers});
  }

  getData(): Observable<any> {
    return this._httpClient.get('https://test-1-723c2.firebaseio.com/data.json')    // removing .json will cause error. use it to try catch throw error
      .pipe(
        map(
          (response) => {
            const data = Array.prototype.slice.call(response);
            /* using POST method will give some unique key which will make the following result an empty array,
            PUT will NOT give unique key, just an object. In this case, the following will give you array content */
            for (const x of data) {
              x.name = '_FETCHED_' + x.name;
            }
            return data;
          }
        ),
        catchError(
          (error: HttpErrorResponse) => {
            console.log('getData Error ', error);
            // return throwError(error);  // print out the error
            return throwError('Error Has Occurred ...');   // customise error message
          }
        )
      );
  }

  putData(servers: any[]): Observable<any> {
    return this._httpClient.put('https://test-1-723c2.firebaseio.com/data.json', servers);
  }

  getAppName(): Observable<any> {
    return this._httpClient.get('https://test-1-723c2.firebaseio.com/appName.json')      // removing .json will cause error. use it to try catch throw error
      .pipe(
        map(
          (response: Response) => {
            console.log(response);
            return response;
          }
        ),
        catchError(
          (error: HttpErrorResponse) => {
            console.log('getAppName Error ', error);
            return throwError(error);
          }
        )
      );
  }
}
