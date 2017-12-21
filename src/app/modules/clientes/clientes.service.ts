import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Cliente } from './cliente.model';

export interface ClientesDataTable {
  items: any[];
  total_count: number;
}

export class ClientesApi {
  data: Cliente[];
  total: number;
}

@Injectable()
export class ClientesService {

  constructor(
    private http: HttpClient
  ) { }

  // getClientes(sort: string, direction: string, page: number): Observable<any> {
  getClientes(params?): Observable<ClientesApi> {
    return this.http.get<ClientesApi>('http://localhost:8000/clientes', {params: params});
  }

}
