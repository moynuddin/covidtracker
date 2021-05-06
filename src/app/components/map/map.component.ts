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
    console.log(payload);
    const lat = payload.lat;
    const long = payload.long;
    const myIcon = L.icon({
      iconUrl: '../../../assets/images/marker.png',
      iconSize: [20, 20],
      iconAnchor: [0, 0],
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [0, 0],
    });
    this.mymap = L.map('mapid').setView([51.505, -0.09], 2);
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
    const circle = L.circle([lat, long], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500,
    });
    circle.addTo(this.mymap);
    const marker = L.marker([0, 0], { icon: myIcon }).addTo(this.mymap);
    marker.setLatLng([lat, long]);
    marker.bindPopup(payload.iso3).openPopup();
    // circle.bindPopup('I am a circle');
    // marker.bindTooltip(payload.flag).openTooltip();
    // L.popup().setLatLng([lat, long]).setContent(payload.iso3).openOn(mymap);
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
          this.getMap(this.country.countryInfo);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    // this.getMap(this.country);
  }
}
