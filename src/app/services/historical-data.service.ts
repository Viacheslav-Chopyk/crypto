import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {ICryptoData} from "../interface/crypto-interface";



@Injectable({
  providedIn: 'root'
})
export class HistoricalDataService {

  constructor(
    private http: HttpClient
  ) {}

 getHistoricalData(exchange: string, baseAsset: string, quoteAsset: string, periodId: string, timeStart: string, timeEnd: string
  ): Observable<ICryptoData[]> {
    const headers = new HttpHeaders({
      'X-CoinAPI-Key': environment.coinApiKey
    });
    const url = `${environment.apiUrl}/${exchange}_SPOT_${baseAsset}_${quoteAsset}/history?period_id=${periodId}&time_start=${timeStart}&time_end=${timeEnd}`;
    return this.http.get<ICryptoData[]>(url, { headers });
  }
}
