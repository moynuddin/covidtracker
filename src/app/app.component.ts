import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DiseaseService } from './_services/disease.service';
import { filter } from 'rxjs/operators';

declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'covid-tracker';
  map: any;
  constructor(private router: Router, private diseaseService: DiseaseService) {}

  ngOnInit() {
    this.diseaseService.chartState.subscribe(
      (res) => {
        this.map = res;
      },
      (error) => {
        console.log(error);
      }
    );
    this.setUpAnalytics();
  }
  setUpAnalytics() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log(event);
        gtag('config', 'G-0RWDK55DLV', {
          page_path: event.urlAfterRedirects,
        });
      });
  }
}
