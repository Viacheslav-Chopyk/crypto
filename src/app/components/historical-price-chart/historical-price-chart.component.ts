import { Component, OnInit } from '@angular/core';
import { HistoricalDataService } from '../../services/historical-data.service';
import {ChartDataset, ChartOptions } from 'chart.js';
import {HttpClient} from "@angular/common/http";
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-historical-price-chart',
  templateUrl: './historical-price-chart.component.html',
  styleUrl: './historical-price-chart.component.css'
})
export class HistoricalPriceChartComponent implements OnInit {
  public lineChartData: ChartDataset[] = [{ data: [], label: 'Price' }];
  // public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = { responsive: true };

  constructor(
    private historicalDataService: HistoricalDataService,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.historicalDataService.getHistoricalData('BTC').subscribe(data => {
      console.log(data)
      this.lineChartData[0].data = data.map((d: { price_close: any; }) => d.price_close);
      // this.lineChartLabels = data.map((d: { time_close: string; }) => d.time_close.split('T')[0]);
    });
  }

}
