import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  disableBalanceOnAdd: boolean = true;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  @ViewChild('clientForm') form: NgForm;
  constructor() {}

  ngOnInit(): void {}

  onSubmit({ valid, value }: { valid: boolean; value: Client }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      // Show error
    } else {
      // Add new client
      // Show Messages
      // Redirect to dashboard
    }
  }
}
