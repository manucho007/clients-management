import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };
  disableBalanceOnEdit: boolean = true;

  @ViewChild('clientForm') form: NgForm;
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private fms: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get the client
    this.clientService.getClient(this.id).subscribe((client) => {
      this.client = client;
    });
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this.fms.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      // Add id to client
      value.id = this.id;
      // Update client
      this.clientService.updateClient(value);
      this.fms.show('Client updated', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate(['/client/' + this.id]);
    }
  }
}
