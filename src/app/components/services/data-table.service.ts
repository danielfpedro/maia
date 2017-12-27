import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

export class DataTable {

  // Paginator e Sort
  paginator: MatPaginator;
  sort: MatSort;

  loadingData = false;      // Controla o loader na pagina
  resultsLength = 0;        // O total de dados sem a paginação
  pageSize = 15;             // Quantidade de items por pagina

  fetchData: Subject<any>;  // Ativar o reload dos dados

  displayedColumns: any[];

  datasource = new MatTableDataSource();

  constructor(paginator: MatPaginator, sort: MatSort, displayedColumns: any[]) {
    
    this.paginator = paginator;
    this.sort = sort;

    this.displayedColumns = displayedColumns;

    this.init();

  }

  init(): void {
    this.fetchData = new Subject<any>();

    this.sort.active = this.displayedColumns[0];
    this.sort.direction = 'desc';
  }

}
