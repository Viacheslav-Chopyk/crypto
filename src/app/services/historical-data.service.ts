
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoricalDataService {
  private apiUrl = 'https://rest.coinapi.io/v1/ohlcv';

  constructor(private http: HttpClient) {}

  getHistoricalData(symbol: string, period: string = '30DAY', limit: number = 30): Observable<any> {
    const headers = new HttpHeaders({
      'X-CoinAPI-Key': environment.coinApiKey
    });
    const url = `${this.apiUrl}/BINANCE_SPOT_ETH_BTC/history?period_id=1MTH&time_start=2023-03-01T00:00:00`;
    return this.http.get<any>(url, { headers });
  }
}
