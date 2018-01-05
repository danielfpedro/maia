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
  getClientes(params?): Observable<any> {
    return this.http.get<any>('http://localhost/maia_api/clientes.json', {params: params});
  }
  save(payload: any) {
    return this.http.post('http://localhost/maia_api/clientes.json', payload);
  }
  get(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost/maia_api/clientes/edit/${id}.json`);
  }
  update(id: number, payload: any) {
    return this.http.patch(`http://localhost/maia_api/clientes/edit/${id}.json`, payload);
  }

}
