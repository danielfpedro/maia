import { Injectable } from '@angular/core';

import { MatDialog, MatDialogRef, MatSort, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA} from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class DataTableService {

  isLoadingData = false;
  resultsLength = 0;

  dataSource = new MatTableDataSource();

  constructor(
    
  ) {
    
  }

  loadData(getData): void {
    Observable.merge()
      .startWith(null)
      .switchMap(() => {
        this.isLoadingData = true;
        return Observable.of({total_count: 0, items: [{name: 'Daniel', created: '10/10/2010'}]});
      })
      .map(data => {
        this.isLoadingData = false;
        this.resultsLength = data.total_count;
        return data.items;
      })
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

}
