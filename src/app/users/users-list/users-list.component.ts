import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../shared/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';

import { UsersService } from '../shared/users.service';

import {MatDialog, MatDialogRef, MatSort, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA} from '@angular/material';

import { Subject } from 'rxjs/Subject';

import {Subscription} from "rxjs/Subscription";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';

import {MediaChange, ObservableMedia} from "@angular/flex-layout";

// Components
import { UserAddComponent } from '../user-add/user-add.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoading = false;
  displayedColumns = ['name', 'created', 'actions'];

  dataSource = new MatTableDataSource();
  resultsLength:number = 0;
  newItem: Subject<any>;

  exampleDatabase: ExampleHttpDao;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    public usersService: UsersService,
    public media: ObservableMedia
  ) { }

  ngOnInit() {

    this.sort.active = 'name';
    this.sort.direction = 'asc';

    this.exampleDatabase = new ExampleHttpDao(this.usersService, this.http);

    this.newItem = new Subject<any>();

    this.sort.sortChange.subscribe(() => {
      console.log('Active', this.sort.active);
    });

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    Observable.merge(this.sort.sortChange, this.newItem)
      .subscribe(() => {
        this.paginator.pageIndex = 0;
      });


    Observable.merge(this.newItem, this.sort.sortChange, this.paginator.page)
      .startWith(null)
      .switchMap(() => {
        this.isLoading = true;
        return this.exampleDatabase.getUsers(this.sort.active, this.sort.direction, this.paginator.pageIndex);
      })
      .map(data => {
        this.isLoading = false;
        this.resultsLength = data.total_count;
        return data.items;
      })
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

  openNewUser(userId: number) {

    let dialogRef = this.dialog.open(UserAddComponent, {
      width: '300px',
      data: {
        userId: userId,
        refreshTable: this.newItem
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }

  sideNavControlOpened() {
    return (this.media.isActive('gt-sm'));
  }
  sideNavControlMode() {
    return (this.media.isActive('gt-sm')) ? 'side' : 'over';
  }
}

export interface UsersApi {
  items: User[];
  total_count: number;
}

export class ExampleHttpDao {
  constructor(private usersService, private http: HttpClient) {}

  getUsers(sort: string, order: string, page: number): Observable<UsersApi> {
    return this.usersService.getUsers({
      page: page + 1,
      sort: sort,
      direction: order
    });
  }
}