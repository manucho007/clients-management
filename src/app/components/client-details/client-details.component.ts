import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
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
      if (client?.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
    });
  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.clientService.deleteClient(this.id);
      this.fms.show('Client removed', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate(['/']);
    }
  }
  updateBalance() {
    this.clientService.updateClient(this.client);
    this.fms.show('Balance updated', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
  }
}
