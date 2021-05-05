import { Component, OnInit } from '@angular/core';
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
      },
      (error) => {
        console.log(error);
      }
    );
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
    console.log(name);
    if (name) {
      this.getSpecificCountry(name);
    }
  }

  getSpecificCountry(country) {
    this.diseaseService.country(country).subscribe(
      (res) => {
        console.log(res);

        this.country = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
