import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// Models
import { Estado } from './models/estado.model';
import { Cidade } from './models/cidade.model';

@Injectable()
export class EnderecosService {

  constructor(
    private http: HttpClient
  ) { }

  allEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>('http://localhost:8000/estados');
  }
  allCidadesByEstadoId(estadoId: number): Observable<Cidade[]> {
  	
  	const params = new HttpParams().set('estado_id', estadoId.toString());

    return this.http.get<Cidade[]>('http://localhost:8000/cidades/todas-por-estado-id', {params: params});
  }
}
