import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ServerService {
  constructor(private _httpClient: HttpClient) {}

  postData(servers: any[]) {
    return this._httpClient.post('https://test-1-723c2.firebaseio.com/data.json', servers);
  }
}
