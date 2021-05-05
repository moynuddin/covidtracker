import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CasesComponent } from './components/cases/cases.component';
import { ChartComponent } from './components/chart/chart.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [AppComponent, CasesComponent, ChartComponent, MapComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
