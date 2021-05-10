import { Component, OnInit } from '@angular/core';
import * as numeral from 'numeral';
import { DiseaseService } from 'src/app/_services/disease.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss'],
})
export class CasesComponent implements OnInit {
  data: any;
  country: any;
  specificCountry: any;
  cases: any;
  active: any;
  recoverd: any;
  deaths: any;
  todayDeaths: any;
  todayRecovered: any;
  todayCases: any;
  constructor(private diseaseService: DiseaseService) {}

  ngOnInit(): void {
    this.getWorldWideData();
    this.allCounties();
  }

  getWorldWideData() {
    this.diseaseService.globalData().subscribe(
      (res) => {
        // console.log(res);
        this.data = res;
        if (this.data) {
          this.formatNumbers(this.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  formatNumbers({
    cases,
    active,
    deaths,
    todayCases,
    todayDeaths,
    todayRecovered,
  }) {
    if (cases) {
      this.cases = numeral(cases).format('0.0a');
    }
    if (active) {
      this.active = numeral(active).format('0.0a');
    }
    if (deaths) {
      this.deaths = numeral(deaths).format('0.0a');
    }
    if (todayCases) this.todayCases = numeral(todayCases).format('0 a');
    if (todayDeaths) {
      this.todayDeaths = numeral(todayDeaths).format('0 a');
    }
    if (todayRecovered) {
      this.todayRecovered = numeral(todayRecovered).format('0 a');
    }
  }

  allCounties() {
    this.diseaseService.counties().subscribe(
      (res) => {
        // console.log(res);
        this.specificCountry = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  SelectCountry(e) {
    const name = e.target.value;
    // console.log(name);
    if (name) {
      this.getSpecificCountry(name);
    }
    if (name) {
      this.getHistoricData(name);
    }
  }

  getSpecificCountry(country) {
    this.diseaseService.country(country).subscribe(
      (res) => {
        // console.log(res);
        this.diseaseService.mapState.next(res);

        this.country = res;
        if (this.country) {
          this.formatNumbers(this.country);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getHistoricData(country) {
    this.diseaseService.graphicData(country).subscribe(
      (res) => {
        // console.log(res);
        this.diseaseService.chartState.next(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
