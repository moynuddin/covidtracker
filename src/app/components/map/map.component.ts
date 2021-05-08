import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { DiseaseService } from 'src/app/_services/disease.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  country: any;
  mymap: any;
  constructor(private diseaseService: DiseaseService) {}

  ngOnInit(): void {}

  getMap(payload) {
    const radius = Math.floor(Math.sqrt(payload.active));
    console.log(radius);

    console.log(payload);
    const lat = payload.countryInfo.lat;
    const long = payload.countryInfo.long;
    this.mymap = L.map('mapid').setView([51.505, -0.09], 3);
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1IjoibW95bjAxIiwiYSI6ImNrb2JzaDJuajBiMjYycG4yejdkZzN0NTAifQ.sPAIv_Ta0olXQAiLe2Mmrg',
      }
    ).addTo(this.mymap);
    L.circleMarker().setLatLng([lat, long]).setRadius(radius).addTo(this.mymap);
    // L.circle().setRadius(200).setLatLng([lat, long]).addTo(this.mymap);

    L.popup()
      .setLatLng([lat, long])
      .setContent(
        `  <img src="${payload.countryInfo.flag}" alt="" style="width: 4rem;"> <h5> ${payload.countryInfo.iso3} <h5/>`
      )
      .openOn(this.mymap);
  }
  ngAfterViewInit() {
    this.getGlobalHistoricData();
    this.diseaseService.mapState.subscribe(
      (res) => {
        console.log(res);
        this.country = res;
        if (this.mymap) {
          this.mymap.remove();
        }
        if (this.country) {
          this.getMap(this.country);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    // this.getMap(this.country);
  }
  getGlobalHistoricData() {
    this.diseaseService.counties().subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
