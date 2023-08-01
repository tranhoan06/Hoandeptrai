import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestgameService {
  constructor(private http: HttpClient) {}

  apiUrl = 'https://api.rawg.io/api';
  apiKey = '47867e219feb47bfb2c383557f1b3781';

  mostPopular(): Observable<any> {
    return this.http.get(`${this.apiUrl}/games?key=${this.apiKey}`);
  }
}
