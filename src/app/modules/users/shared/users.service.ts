import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, tap, catchError } from 'rxjs/operators';

/**
 * Models
 */
import { User } from './user.model';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost/maia/api';

  getUsers(params?): Observable<User[]> {
  	return this.http.get<User[]>(this.baseUrl + '/users.json', {params: params});
  }

  save(user: User): Observable<any> {
  	return this.http.post(this.baseUrl + '/users/add.json', user);
  }

  get(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/users/view/'+id+'.json');
  }

  update(id: number, user: User): Observable<any> {
    return this.http.patch(this.baseUrl + '/users/edit/'+id+'.json', user);
  }


  // handleError(error: Response) {
  //   console.error(error);
  //   return Observable.throw ("ffdf");
  //   ;
  // }

}
