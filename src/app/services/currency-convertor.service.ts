import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConvertableData } from '../models/convertableData';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CurrencyConvertorService {
  private api_key = '9181be8620-b75b4fdfbb-rd94ja';

  constructor(private http: HttpClient) {}

  getCurCurrencyCourse(currency: string) {
    return this.http
      .get<any>(
        `${environment.apiURI}/fetch-one?from=${currency}&to=UAH&api_key=${this.api_key}`
      )
      .pipe(map((data) => data.result.UAH));
  }

  public getConvertCurrency(data: ConvertableData): Observable<number> {
    const { fromCurrency, toCurrency, amount } = data;

    return this.http
      .get<any>(
        `${environment.apiURI}/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&api_key=${this.api_key}`
      )
      .pipe(map((data) => data.result[toCurrency]));
  }
}
