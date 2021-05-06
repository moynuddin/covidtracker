import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DiseaseService } from 'src/app/_services/disease.service';
Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart', { static: false }) chart: ElementRef;
  barChart: any;
  cases: any;
  deaths: any;
  recovered: any;
  dates: any;
  constructor(private diseaseService: DiseaseService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getGlobalHistoricData();
    this.diseaseService.chartState.subscribe(
      (res) => {
        if (res) {
          this.cases = res['timeline']['cases'];
          this.deaths = res['timeline']['deaths'];
          this.recovered = res['timeline']['recovered'];

          if (this.barChart) {
            this.barChart.destroy();
          }
          this.barGraph(this.cases, this.deaths, this.recovered);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getGlobalHistoricData() {
    this.diseaseService.globalGraphicData().subscribe(
      (res) => {
        // console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  barGraph(cases, deaths, recovered) {
    const dates = Object.keys(cases);
    const Todaycases = Object.values(cases);
    const Todaydeaths = Object.values(deaths);
    const TodayRecovered = Object.values(recovered);

    this.barChart = new Chart(this.chart.nativeElement, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Cases',
            data: Todaycases,
            borderColor: 'rgb(0,255,255)',
            backgroundColor: 'rgb(0,255,255)',

            borderWidth: 1,
          },
          {
            label: 'Deaths',
            data: Todaydeaths,
            borderColor: 'rgb(139,0,0)',
            backgroundColor: 'rgb(139,0,0)',
            borderWidth: 1,
          },
          {
            label: 'Recovered',
            data: TodayRecovered,
            borderColor: 'rgb(0,100,0)',
            backgroundColor: 'rgb(0,100,0)',

            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        animations: {
          tension: {
            duration: 1000,
            easing: 'easeInOutCubic',
            from: 1,
            to: 0,
            loop: true,
          },
        },
      },
    });
  }
}
