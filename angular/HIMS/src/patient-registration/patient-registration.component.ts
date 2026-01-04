import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Patient } from './patient-registration.model';

@Component({
  selector: 'patient-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-registration.html',
  styleUrls: ['./patient-registration.css']
})
export class PetientRegistation implements OnInit {

  PatientObj: Patient = new Patient();
  PatientObjs: any[] = [];

  isEditMode = false;
  editPatientId: number | null = null;

  successMessage = '';
  formErrorMessage = '';
  addressErrorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.PatientObj.formPatientGroup.markAllAsTouched();
    this.addressErrorMessage = 'At least one address is required';
  }

  // ---------------- LOAD ----------------
  getDBdata() {
    this.http
      .get<any[]>('https://localhost:7168/Patient/Load')
      .subscribe({
        next: (data) => {
          this.PatientObjs = data;
        },
        error: () => {
          this.formErrorMessage = 'Failed to load patients';
        }
      });
  }

  // ---------------- EDIT ----------------
  EditPatient(p: any) {
    this.isEditMode = true;
    this.editPatientId = p.id;

    const editedPatient = new Patient();

    editedPatient.formPatientGroup.patchValue({
      CustomerNameControl: p.name,
      CustomerCodeControl: p.code,
      CustomerAmountControl: p.amount,
      CustomerAddressControl: ''
    });

    editedPatient.Addresses = p.addresses
      ? [...p.addresses]
      : [...p.Addresses];

    editedPatient.formPatientGroup
      .get('CustomerCodeControl')
      ?.disable();

    this.PatientObj = editedPatient;
    this.addressErrorMessage = '';
  }

  // ---------------- ADDRESS ----------------
  AddAddress() {
    const ctrl = this.PatientObj.formPatientGroup.get('CustomerAddressControl');
    const value = ctrl?.value?.trim();

    if (!value) {
      this.addressErrorMessage = 'Address cannot be empty';
      return;
    }

    this.PatientObj.Addresses.push({ street1: value });
    ctrl?.reset();
    this.addressErrorMessage = '';
  }

  // ---------------- ADD ----------------
  AddPatient() {
    if (this.PatientObj.formPatientGroup.invalid) {
      this.formErrorMessage = 'Please fix the highlighted errors';
      this.PatientObj.formPatientGroup.markAllAsTouched();
      return;
    }

    if (this.PatientObj.Addresses.length === 0) {
      this.addressErrorMessage = 'At least one address is required';
      return;
    }

    const newPatient = new Patient();

    newPatient.name =
      this.PatientObj.formPatientGroup.get('CustomerNameControl')?.value;

    newPatient.code =
      this.PatientObj.formPatientGroup.get('CustomerCodeControl')?.value;

    newPatient.amount =
      this.PatientObj.formPatientGroup.get('CustomerAmountControl')?.value;

    newPatient.Addresses = [...this.PatientObj.Addresses];
    newPatient.formPatientGroup = null as any;

    this.PatientObjs.push(newPatient);

    this.PatientObj = new Patient();
    this.addressErrorMessage = 'At least one address is required';
  }

  // ---------------- UPDATE ----------------
  UpdatePatient() {
    if (this.PatientObj.formPatientGroup.invalid) {
      this.formErrorMessage = 'Please fix the highlighted errors';
      this.PatientObj.formPatientGroup.markAllAsTouched();
      return;
    }

    if (this.PatientObj.Addresses.length === 0) {
      this.addressErrorMessage = 'At least one address is required';
      return;
    }

    const updatedPatient = {
      id: this.editPatientId,
      name: this.PatientObj.formPatientGroup.get('CustomerNameControl')?.value,
      code: this.PatientObj.formPatientGroup.get('CustomerCodeControl')?.value,
      amount: this.PatientObj.formPatientGroup.get('CustomerAmountControl')?.value,
      Addresses: this.PatientObj.Addresses
    };

    this.http
      .put('https://localhost:7168/Patient/Update', updatedPatient)
      .subscribe({
        next: () => {
          this.successMessage = 'Patient updated successfully';
          this.isEditMode = false;
          this.editPatientId = null;

          this.PatientObj = new Patient();
          this.addressErrorMessage = 'At least one address is required';

          this.getDBdata();
        },
        error: () => {
          this.formErrorMessage = 'Update failed';
        }
      });
  }
}