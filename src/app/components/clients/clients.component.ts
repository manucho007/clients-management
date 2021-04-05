import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, reduce, tap } from 'rxjs/operators';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;
  // clients$: Observable<Client[]>;
  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    // this.clients$ = this.clientService.getClients();
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }
  getTotalOwed() {
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + parseInt(client.balance.toString());
    }, 0);
  }
}
