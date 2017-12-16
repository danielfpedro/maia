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
  exports: [RouterModule],
  declarations: [
    // Layout
    DefaultLayoutComponent,
    // Components
    ClientesListComponent,
    ClientesAddComponent
  ],
  providers: [
  ]
})
export class ClientesModule { }
