import { Injectable } from '@angular/core';

import { MatDialog, MatDialogRef, MatSort, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA} from '@angular/material';

import { ClientesService } from '../../modules/clientes/clientes.service';

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

  dataSource = new MatTableDataSource();

  constructor(
    private clientesService: ClientesService
  ) {
    
    this.init();
    
  }

  init():void {
     // Observable.merge(this.sort.sortChange, this.newDataService.newItem)
     //  .subscribe(() => {
     //    this.paginator.pageIndex = 0;
     //  });
  }

  loadData(getData: Observable<any>, changers): void {
    Observable.merge(...changers)
      .startWith(null)
      .switchMap(() => {
        this.isLoadingData = true;
        return getData;
      })
      .map(response => {
        this.isLoadingData = false;
        this.resultsLength = response.total;
        return response.data;
      })
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

}
