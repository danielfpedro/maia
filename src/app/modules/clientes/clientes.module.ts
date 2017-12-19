import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
//import { CommonModule } from '@angular/common';

// Layout
import { DefaultLayoutComponent } from '../../layouts/default/default-layout.component';
/**
 * Modules
 */
import { SharedModule } from '../shared/shared.module';
/**
 * Components
 */
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { ClientesAddComponent } from './clientes-add/clientes-add.component';

import { MaterialModule } from '../shared/material.module';
import { MatTableModule } from '@angular/material';

import { ClientesService } from './clientes.service';

//import { BrowserModule } from '@angular/platform-browser';

/**
 * Router
 */
const routes: Routes = [
  {
    path: 'clientes',
    children: [
      // Default Layout
      {
        path: '',
        component: DefaultLayoutComponent,
        children: [
        { path: '', component: ClientesListComponent },
        ]
      },
    ]
  },
];


@NgModule({
  imports: [
    // BrowserModule,
    // CommonModule,
    RouterModule.forRoot(routes),
    SharedModule,
    // MaterialModule
  ],
  exports: [RouterModule, MatTableModule],
  declarations: [
    // Layout
    DefaultLayoutComponent,
    // Components
    ClientesListComponent,
    ClientesAddComponent
  ],
  entryComponents: [
    ClientesAddComponent
  ],
  providers: [
    ClientesService
  ]
})
export class ClientesModule { }
