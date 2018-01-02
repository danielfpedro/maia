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

  enderecoByCep(cep: string): Observable<any> {
    
    cep = cep.replace("-", "");

    return new Observable(observer => {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe(data => {
          console.log('Data', data);
          this.cidadeByNome(data.localidade)
            .subscribe(cidade => {
              let out = {
                cidade_id: cidade.id,
                estado_id: cidade.estado.id,
                bairro: data.bairro,
                rua: data.logradouro
              };
              observer.next(out);
            });
        });
    });
  }

  cidadeByNome(cidade: string): Observable<any> {
    const params = new HttpParams().set('nome', cidade);
    return this.http.get<any>('http://localhost:8000/cidades/get/por-nome', {params: params});
  }
}
