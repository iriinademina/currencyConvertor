import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  SimpleChanges,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
} from 'rxjs/operators';
import { ACCESSIBLE_CURRENCY } from '../../../constans/accessible-currency';
import { ConvertableDataForm, Forms } from '../../../models/currency.model';

@Component({
  selector: 'app-convertor-form',
  templateUrl: './convertor-form.component.html',
  styleUrls: ['./convertor-form.component.css'],
})
export class ConvertorFormComponent implements OnInit {
  @Input() convertedAmount: number | null;
  @Input() formName: string;
  @Output() convert = new EventEmitter<ConvertableDataForm>();

  public currencyList = ACCESSIBLE_CURRENCY;
  public baseForm: FormGroup;
  public targetForm: FormGroup;

  public get baseCurrency(): string {
    return this.baseForm.get('baseCurrency')?.value;
  }

  public get targetCurrency(): string {
    return this.targetForm.get('targetCurrency')?.value;
  }

  public get baseAmount(): number {
    return this.baseForm.get('amount')?.value;
  }

  public get targetAmount(): number {
    return this.targetForm.get('amount')?.value;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForms();
    this.formListener();
  }

  initForms() {
    this.baseForm = this.formBuilder.group({
      amount: [null, Validators.required],
      baseCurrency: [null, Validators.required],
    });

    this.targetForm = this.formBuilder.group({
      amount: [null, Validators.required],
      targetCurrency: [null, Validators.required],
    });
  }

  formListener(): void {
    this.baseForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (this.checkConditionForRequest()) {
        const fromCurrency = this.baseAmount
          ? this.baseCurrency
          : this.targetCurrency;
        const toCurrency =
          fromCurrency === this.baseCurrency
            ? this.targetCurrency
            : this.baseCurrency;
        const amount = this.baseAmount || this.targetAmount;
        const toForm =
          fromCurrency === this.baseCurrency ? 'targetForm' : 'baseForm';
        this.convert.emit({ fromCurrency, toCurrency, amount, toForm });
      }
    });

    this.targetForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (this.checkConditionForRequest()) {
        const fromCurrency = this.targetAmount
          ? this.targetCurrency
          : this.baseCurrency;
        const toCurrency =
          fromCurrency === this.targetCurrency
            ? this.baseCurrency
            : this.targetCurrency;
        const amount = this.targetAmount || this.baseAmount;
        const toForm =
          fromCurrency === this.targetCurrency ? 'baseForm' : 'targetForm';
        this.convert.emit({ fromCurrency, toCurrency, amount, toForm });
      }
    });
  }

  checkConditionForRequest(): boolean {
    const validCurrency = this.baseCurrency && this.targetCurrency;
    const validAmount = this.baseAmount || this.targetAmount;

    return !!validCurrency && !!validAmount;
  }
}
