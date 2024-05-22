import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HistoricalPriceChartComponent} from "./components/historical-price-chart/historical-price-chart.component";
import {RealTimePriceComponent} from "./components/real-time-price/real-time-price.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HistoricalPriceChartComponent, RealTimePriceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crypto';
}
