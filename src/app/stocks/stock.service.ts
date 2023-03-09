import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getUnixTime } from 'date-fns';
import { catchError, first, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { StockGroup } from './models/stock-group.model';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private urlApi = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getStockByPeriod(
    symbol: string,
    periodStart: Date,
    periodEnd: Date,
    interval: string = '1d'
  ): Observable<any> {
    const queryParams = new HttpParams()
      .set('interval', interval)
      .set('period1', getUnixTime(periodStart))
      .set('period2', getUnixTime(periodEnd));

    return this.httpClient
      .get(`${this.urlApi}/chart/${symbol}.SA`, { params: queryParams })
      .pipe(
        map((data: any) => data.chart.result[0]),
        catchError(() => throwError(() => new Error('Erro ao buscar os dados')))
      );
  }

  getStockOption(): Observable<StockGroup[]> {
    return this.httpClient.get<StockGroup[]>('assets/stock-option.json').pipe(
      first(),
      catchError(() => throwError(() => new Error('Erro ao buscar os dados')))
    );
  }
}
