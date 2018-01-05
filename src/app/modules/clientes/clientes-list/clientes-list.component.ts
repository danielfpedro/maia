import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm, FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

import { DataTable } from '../../../components/services/data-table.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss'],
})
export class ClientesListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   
  filtersForm: FormGroup;
  dataTable: DataTable;

  constructor(
    public clientesService: ClientesService,
    public newDataService: NewDataService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {

    this.createForm();

    // New Data info
    this.newDataService.component = ClientesAddComponent;

    // Dta tabe info
    this.dataTable = new DataTable(this.paginator, this.sort, ['nome', 'created_at', 'actions']);

    // // Loading Data
    Observable.merge(this.dataTable.paginator.page, this.dataTable.sort.sortChange, this.dataTable.fetchData)
      .startWith(null)
      .switchMap(() => {

        this.dataTable.loadingData = true;

        let params = {
          page: (this.dataTable.paginator.pageIndex + 1),
          page_size: this.dataTable.pageSize,
          sort_by: this.dataTable.sort.active,
          sort_direction: this.dataTable.sort.direction
        };

        params = Object.assign(params, this.filtersForm.value);

        return this.clientesService.getClientes(params);
      })
      .map(response => {
        this.dataTable.loadingData = false;
        this.dataTable.resultsLength = response.pagination.count;

        return response.items;
      })
      .subscribe(data => {
        this.dataTable.datasource.data = data;
      });
  }

  createForm(): void {
    this.filtersForm = this.fb.group({
      q: ['']
    });
  }

}