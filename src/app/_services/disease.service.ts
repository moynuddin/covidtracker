import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DiseaseService {
  constructor(private http: HttpClient) {}
  chartState: BehaviorSubject<any> = new BehaviorSubject('');
  mapState: BehaviorSubject<any> = new BehaviorSubject('');
  globalData() {
    return this.http.get(environment.BASE_URL);
  }
  counties() {
    return this.http.get(environment.country_URL);
  }

  country(country: string) {
    return this.http.get(`${environment.country_URL}/${country}`);
  }
  graphicData(country: string) {
    return this.http.get(`${environment.graph_URL}/${country}`);
  }
  globalGraphicData() {
    return this.http.get(`${environment.graph_URL}/?lastdays=30`);
  }
}
