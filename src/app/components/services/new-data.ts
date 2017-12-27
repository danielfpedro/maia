import { Injectable } from '@angular/core';

// import { Subject } from 'rxjs/Subject';

import { MatDialog, MatDialogRef } from '@angular/material';

@Injectable()
export class NewDataService {

  modalWidth = '600px';
  // newItem: Subject<any>;
  component: any;

  constructor(
    private dialog: MatDialog
  ) {
    // this.newItem = new Subject<any>();
  }

  public open(data = {}) {
    let dialogRef = this.dialog.open(this.component, {
      width: this.modalWidth,
      data: data
    });
  }

}
