import {Component, OnInit} from '@angular/core';
import {HistoricalDataService} from '../../services/historical-data.service';
import {Chart, registerables} from "chart.js";
import {ICryptoData} from "../../interface/crypto-interface";

@Component({
  selector: 'app-historical-price-chart',
  templateUrl: './historical-price-chart.component.html',
  styleUrl: './historical-price-chart.component.css'
})
export class HistoricalPriceChartComponent implements OnInit {
  public chart: any;

  constructor(
    private historicalDataService: HistoricalDataService,
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.initializeChart()
    this.getData()
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

  private getData(): void {
    const exchange = 'BINANCE';
    const baseAsset = 'ETH';
    const quoteAsset = 'BTC';
    const periodId = '1MTH';
    const timeStart = '2023-03-01T00:00:00';
    this.historicalDataService.getHistoricalData(exchange, baseAsset, quoteAsset, periodId, timeStart).subscribe((res: ICryptoData[]) => {
      res.forEach(item => {
        const month = new Date(item.time_close).toLocaleString('en-US', {month: 'long'});
        this.chart.data.labels.push(month);
        this.chart.data.datasets[0].data.push(item.price_high);
      });
      this.chart.update();
    });
  }
}
