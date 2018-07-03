import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ServerService {
  constructor(private _httpClient: HttpClient) {}

  postData(servers: any[]): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; testing-header');
    return this._httpClient.post('https://test-1-723c2.firebaseio.com/data.json', servers,
      {headers: headers});
  }

  getData(): Observable<any> {
    return this._httpClient.get('https://test-1-723c2.firebaseio.com/data.json')
      .pipe(
        map(
          (response) => {
            const data = Array.prototype.slice.call(response);
            return data;
          }
        )
      );
  }

  putData(servers: any[]): Observable<any> {
    return this._httpClient.put('https://test-1-723c2.firebaseio.com/data.json', servers);
  }
}
