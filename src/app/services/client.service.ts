import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients$: Observable<Client[]>;
  client$: Observable<Client>;
  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection<Client>('clients', (ref) =>
      ref.orderBy('lastName', 'asc')
    );
  }

  getClients(): Observable<Client[]> {
    // Get Clients with ID
    this.clients$ = this.clientsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Client;
          data.id = a.payload.doc.id;
          return data;
        })
      ),
      shareReplay()
    );
    return this.clients$;
  }

  newClient(client: Client) {
    this.clientsCollection.add(client);
  }
}
