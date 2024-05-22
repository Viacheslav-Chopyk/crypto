import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { HistoricalPriceChartComponent } from './components/historical-price-chart/historical-price-chart.component';
import {HistoricalDataService} from "./services/historical-data.service";

const config: SocketIoConfig = { url: 'wss://ws-sandbox.coinapi.io/v1/', options: {} };

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    HistoricalPriceChartComponent,
    AppComponent,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
