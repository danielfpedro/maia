import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Cliente } from './cliente.model';

export interface ClientesDataTable {
  items: any[];
  total_count: number;
}

@Injectable()
export class ClientesService {

  constructor() { }

  getClientes(sort: string, direction: string, page: number): Observable<ClientesDataTable> {
  	return Observable.of({items: [], total_count: 0});
  }

}
