import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from '@angular/forms';

import { Address } from './Address.model';

export class Patient {

  name: string = '';
  code: string = '';
  amount: number = 0;

  Addresses: Address[] = [];

  formPatientGroup: FormGroup;

  constructor() {
    const fb = new FormBuilder();

    this.formPatientGroup = fb.group({
      CustomerNameControl: new FormControl('', [
        Validators.required
      ]),

      CustomerCodeControl: new FormControl('', [
        Validators.required,
        Validators.pattern(/^PAT\d{4}$/)
      ]),

      CustomerAmountControl: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ]),

      CustomerAddressControl: new FormControl('')
    });

    // 🔹 show validation errors immediately
    this.formPatientGroup.markAllAsTouched();
  }
}