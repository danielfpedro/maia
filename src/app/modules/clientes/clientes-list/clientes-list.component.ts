import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
   
  filtersForm: FormGroup;

  pageSize: number;
  displayedColumns = ['nome', 'created_at', 'actions'];
  filters: any;

  constructor(
    public clientesService: ClientesService,
    public newDataService: NewDataService,
    public dataTableService: DataTableService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.createForm();

    this.sort.active = 'nome';
    this.sort.direction = 'asc';

    this.pageSize = 15;

    this.newDataService.component = ClientesAddComponent;
    this.dataTableService.service = this.clientesService;
    this.dataTableService.getDataMethodName = 'getClientes';
    
    this.dataTableService.getData= this.clientesService.getClientes({});

    Observable.merge(this.paginator.page, this.sort.sortChange, this.dataTableService.refresh)
      .startWith(null)
      .switchMap(() => {
        this.dataTableService.isLoadingData = true;

        let params = {
          page: (this.paginator.pageIndex + 1),
          page_size: this.pageSize,
          sort_by: this.sort.active,
          sort_direction: this.sort.direction
        };
        console.log('Filters', this.filtersForm.value);

        return this.clientesService.getClientes(params);
      })
      .map(response => {
        this.dataTableService.isLoadingData = false;
        this.dataTableService.resultsLength = response.total;
        return response.data;
      })
      .subscribe(data => {
        this.dataTableService.dataSource.data = data;
      });

    // this.dataTableService.loadData(this.clientesService.getClientes(), [this.sort.sortChange, this.paginator.page]);
  }

  createForm(): void {
    this.filtersForm = this.fb.group({
      q: ['']
    });
  }

}