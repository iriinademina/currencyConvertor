import { Component, OnInit } from '@angular/core';
import { ConvertableData } from '../../models/convertableData';
import { CurrencyConvertorService } from '../../services/currency-convertor.service';
import { Observable, tap } from 'rxjs';
import { ConvertableDataForm } from '../../models/currency.model';

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.css']
})
export class ConvertorComponent implements OnInit {
  public toForm: string;
  public convertedAmount$: Observable<number | null>;

  constructor(private converterService: CurrencyConvertorService) { }

  ngOnInit(): void {
  }

  public convertCurrency(data: ConvertableDataForm): void {
    const {toForm, ...rest} = data;
    this.convertedAmount$ = this.converterService.getConvertCurrency({...rest})
      .pipe(tap((v) => {
        (this.toForm = toForm)
      }
  ));
  }
}