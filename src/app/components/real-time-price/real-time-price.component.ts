import {Component, OnDestroy, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-real-time-price',
  templateUrl: './real-time-price.component.html',
  styleUrls: ['./real-time-price.component.css']
})
export class RealTimePriceComponent implements OnInit, OnDestroy {
  public chart: any;
  private socket: WebSocket | undefined;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initializeChart();
    this.initializeWebSocket();
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  private initializeChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement | null;
    if (!ctx) {
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          data: [],
          label: 'BTC/USD',
          borderColor: '#3e95cd',
          fill: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private initializeWebSocket(): void {
    this.socket = new WebSocket('wss://ws.coinapi.io/v1/');

    this.socket.onopen = (event: Event) => {
      this.socket?.send(JSON.stringify({
        "type": "hello",
        "apikey": environment.coinApiKey,
        "subscribe_data_type": ["trade"],
        "subscribe_filter_symbol_id": ["BITSTAMP_SPOT_BTC_USD$", "BITFINEX_SPOT_BTC_LTC$"]
      }));
    };

    this.socket.onmessage = (event: any) => {
      const data = JSON.parse(event.data);

      if (this.chart) {
        // Add new data to the chart
        this.chart.data.labels.push(data.time_exchange);
        this.chart.data.datasets[0].data.push(data.price);

        // Remove the oldest data point if there are more than 50
        if (this.chart.data.labels.length > 50) {
          this.chart.data.labels.shift();
          this.chart.data.datasets[0].data.shift();
        }

        // Update the chart
        this.chart.update();
      }
    };

    this.socket.onerror = (error: Event) => {
    };
  }
}
