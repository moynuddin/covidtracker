import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class DiseaseService {
  constructor(private http: HttpClient) {}
  globalData() {
    return this.http.get(environment.BASE_URL);
  }
  counties() {
    return this.http.get(environment.countries_URL);
  }

  country(country: string) {
    return this.http.get(`${environment.country_URL}/${country}`);
  }
}
