import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { HistoricalPriceChartComponent } from './components/historical-price-chart/historical-price-chart.component';
import {RealTimePriceComponent} from "./components/real-time-price/real-time-price.component";
import {HistoricalDataService} from "./services/historical-data.service";
import {RealTimeDataService} from "./services/real-time-data.service";

const config: SocketIoConfig = { url: 'wss://ws-sandbox.coinapi.io/v1/', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HistoricalPriceChartComponent,
    RealTimePriceComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    HistoricalDataService,
    RealTimeDataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
