import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, map } from 'rxjs';
import { CurrencyConvertorService } from '../../services/currency-convertor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  course$: Observable<any>;
  constructor(private currencyConvertorService: CurrencyConvertorService) {}

  ngOnInit(): void {
    this.course$ = combineLatest([
      this.currencyConvertorService.getCurCurrencyCourse('USD'),
      this.currencyConvertorService.getCurCurrencyCourse('EUR'),
    ]).pipe(
      map(([USD, EUR]) => {
        return { USD: USD, EUR: EUR };
      })
    );
  }
}
