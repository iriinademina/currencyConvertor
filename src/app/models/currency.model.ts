import { ConvertableData } from './convertableData';
import { FormGroup } from '@angular/forms';

export interface Currency {
  currency: string;
  weight?: number;
  rate?: number;
}

export type ConvertableDataForm = ConvertableData & {toForm: string};

export interface Forms {
  baseForm: FormGroup,
  targetForm: FormGroup,
}

  