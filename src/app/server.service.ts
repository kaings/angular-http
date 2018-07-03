import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ServerService {
  constructor(private _httpClient: HttpClient) {}

  postData(servers: any[]) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; testing-header');
    return this._httpClient.post('https://test-1-723c2.firebaseio.com/data.json', servers,
      {headers: headers});
  }
}
