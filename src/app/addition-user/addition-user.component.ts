import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from '../../User';

@Component({
  selector: 'app-addition-user',
  templateUrl: './addition-user.component.html',
  styleUrls: ['./addition-user.component.css']
})
export class AdditionUserComponent implements OnInit {

  validateForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phoneNumberPrefix: ['612'],
      phoneNumber: [null, [Validators.required]],
      streetAddress: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      description: [null]
    });
  }

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      streetAddress: '',
      city: '',
      state: '',
      zip: ''
    },
    description: '',
  };

  isVisibleModal = false;
  isLoadingData = false;

  @Output() onAdded = new EventEmitter<User>();
  added(user: User) {
    this.onAdded.emit(user);
  }

  add(): void {
    this.user.id = this.validateForm.get('id')?.value;
    this.user.firstName = this.validateForm.get('firstName')?.value;
    this.user.lastName = this.validateForm.get('lastName')?.value;
    this.user.email = this.validateForm.get('email')?.value;
    this.user.phone = "(" + this.validateForm.get('phoneNumberPrefix')?.value + ")" + this.validateForm.get('phoneNumber')?.value;
    this.user.address.streetAddress = this.validateForm.get('streetAddress')?.value;
    this.user.address.city = this.validateForm.get('city')?.value;
    this.user.address.state = this.validateForm.get('state')?.value;
    this.user.address.zip = this.validateForm.get('zip')?.value;
    this.user.description = this.validateForm.get('description')?.value;

    this.isLoadingData = true;
    try {
      localStorage.setItem(this.user.id.toString(), JSON.stringify(this.user));
      this.added(this.user);
    }
    catch (e) {
      console.log(e);
    }
    this.isLoadingData = false;
    this.exitModal();
  }

  exitModal(): void { this.isVisibleModal = false }
}
