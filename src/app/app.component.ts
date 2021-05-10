import { Component, OnInit } from '@angular/core';
import { DiseaseService } from './_services/disease.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'covid-tracker';
  map: any;
  constructor(private diseaseService: DiseaseService) {}

  ngOnInit() {
    this.diseaseService.chartState.subscribe(
      (res) => {
        this.map = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
