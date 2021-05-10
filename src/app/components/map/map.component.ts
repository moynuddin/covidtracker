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
  globalData: any;
  constructor(private diseaseService: DiseaseService) {}

  ngOnInit(): void {}

  getMap(payload) {
    console.log(payload);

    const radius = Math.floor(Math.sqrt(payload.activePerOneMillion));
    // console.log(payload);
    const lat = payload.countryInfo.lat;

    const long = payload.countryInfo.long;

    this.mymap = L.map('mapid', {
      minZoom: 4,
      maxZoom: 12,
    }).setView([51.505, -0.09], 3);
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
    L.circle().setRadius(200).setLatLng([lat, long]).addTo(this.mymap);

    L.popup({
      closeButton: false,
      closePopupOnClick: false,
      closeOnClick: false,
    })
      .setLatLng([lat, long])
      .setContent(
        ` <h5 style="display:flex; justify-content: center"> ${payload.countryInfo.iso3} <h5/>  <img src="${payload.countryInfo.flag}" alt="" style="width: 10rem;"> <p>Cases: ${payload.cases}</p><p>Recovered: ${payload.recovered}</p><p>Deaths: ${payload.deaths}</p>`
      )

      .openOn(this.mymap);
  }
  ngAfterViewInit() {
    this.diseaseService.mapState.subscribe(
      (res) => {
        // console.log(res);
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
  }
}
