import { Component, OnInit, Inject } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { UsersService } from '../shared/users.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user: User;
  isLoading: boolean = false;
  userForm: FormGroup;

  constructor(
    public usersService: UsersService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required]
    });

    if (this.data.userId) {

      this.usersService.get(this.data.userId)
        .subscribe(user => {
          console.log('User carregado', user);
          this.userForm.patchValue(user);
        });
    }
  }

  save() {
    if (this.userForm.invalid) {
      return;
    }

    let request = this.usersService.save(this.userForm.value);
    if (this.data.userId) {
      request = this.usersService.update(this.data.userId, this.userForm.value);
    }

    this.isLoading = true;
    request
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(() => {
        this.data.refreshTable.next();
        this.dialogRef.close();
      });
  }

}
