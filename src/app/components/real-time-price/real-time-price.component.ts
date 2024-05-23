import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import {ITrade} from "../../interface/crypto-interface";

@Component({
  selector: 'app-real-time-price',
  templateUrl: './real-time-price.component.html',
  styleUrls: ['./real-time-price.component.css']
})
export class RealTimePriceComponent implements OnInit, OnDestroy {
  public dateFormat = 'd MMMM h:mm a'
  public realTimeData: ITrade;
  private socket: WebSocket | undefined;
  private readonly WEBSOCKET_URL = 'wss://ws.coinapi.io/v1/';
  private readonly WEBSOCKET_MESSAGE = {
    type: "hello",
    apikey: environment.coinApiKey,
    subscribe_data_type: ["trade"],
    subscribe_filter_symbol_id: ["BITSTAMP_SPOT_BTC_USD$", "BITFINEX_SPOT_BTC_LTC$"]
  };

  constructor() {

  }

  ngOnInit() {
    this.initializeWebSocket();
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  }

  private initializeWebSocket() {
    this.socket = new WebSocket(this.WEBSOCKET_URL);

    this.socket.onopen = (event: Event) => {
      this.socket?.send(JSON.stringify(this.WEBSOCKET_MESSAGE));
    };

    this.socket.onmessage = (event: MessageEvent) => {
      try {
        this.realTimeData  = JSON.parse(event.data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.socket.onerror = (error: Event) => {
      console.log(`WebSocket error: ${error}`);
    };
  }
}
