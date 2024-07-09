import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 632fca26-96ef-4bfc-8a35-3f97aeaf8c30'
    })
  }

  private jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/galgovinilos.appspot.com/o/vinilos.json?alt=media&token=8961d97a-79f5-4d0c-82cc-3d99200111a2';

  private lista:any;

  constructor(private http: HttpClient) {}

  getJsonData(): Observable<any> {
    return this.http.get(this.jsonUrl);

  }


}