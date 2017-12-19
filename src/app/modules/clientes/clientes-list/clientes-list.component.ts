import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort, MatPaginator } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';

// Models
import { Cliente } from '../cliente.model';
// Components
import { ClientesAddComponent } from '../clientes-add/clientes-add.component';
// Services
import { ClientesService } from '../clientes.service';
import { NewDataService } from '../../../components/services/new-data';
import { DataTableService } from '../../../components/services/data-table.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss'],
})
export class ClientesListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['name', 'created', 'actions'];

  constructor(
    public clientesService: ClientesService,
    public newDataService: NewDataService,
    public dataTableService: DataTableService,
  ) { }

  ngOnInit() {

    this.newDataService.component = ClientesAddComponent;

    this.sort.active = 'name';
    this.sort.direction = 'asc';

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    Observable.merge(this.sort.sortChange, this.newDataService.newItem)
      .subscribe(() => {
        this.paginator.pageIndex = 0;
      });

    this.dataTableService.loadData(this.clientesService.getClientes(this.sort.active, this.sort.direction, this.paginator.pageIndex));
  }
}