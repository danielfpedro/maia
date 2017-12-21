import { Injectable } from '@angular/core';

import { MatDialog, MatDialogRef, MatSort, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA} from '@angular/material';

import { ClientesService } from '../../modules/clientes/clientes.service';

import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

export class ClientesApi {
  data: any[];
  total: number;
}

@Injectable()
export class DataTableService {

  isLoadingData = false;
  resultsLength = 0;

  paginator: any;
  sort: any;

  hasPaginator: boolean;
  hasSort: boolean;
  changers: any[];

  service: any;
  getDataMethodName: any;

  refresh: Subject<any>;

  dataSource = new MatTableDataSource();
  getData: any;

  constructor(
    private clientesService: ClientesService
  ) {
    
    this.init();
    
  }

  init(): void {
    this.refresh = new Subject<any>();
     // Observable.merge(this.sort.sortChange, this.newDataService.newItem)
     //  .subscribe(() => {
     //    this.paginator.pageIndex = 0;
     //  });

    // Observable.merge(...this.changers)
    //   .startWith(null)
    //   .switchMap(() => {
    //     this.isLoadingData = true;
    //     return this.getData.call();
    //   })
    //   .map(response => {
    //     this.isLoadingData = false;
    //     this.resultsLength = response.total;
    //     return response.data;
    //   })
    //   .subscribe(data => {
    //     this.dataSource.data = data;
    //   });
  }

  loadData(getData: Observable<any>, changers): void {
    
    // changers.push(this.refresh);

    // Observable.merge(...changers)
    //   .startWith(null)
    //   .switchMap(() => {
    //     this.isLoadingData = true;
    //     return getData;
    //   })
    //   .map(response => {
    //     this.isLoadingData = false;
    //     this.resultsLength = response.total;
    //     return response.data;
    //   })
    //   .subscribe(data => {
    //     this.dataSource.data = data;
    //   });
  }

}
