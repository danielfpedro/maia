import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesListComponent } from './clientes-list/clientes-list.component';

/**
 * Router
 */
import { ClientesRoutingModule } from './clientes-routing.module';
/**
 * Components
 */


@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule
    // Routing
    // ConsoleRounting
  ],
  declarations: [
    ClientesListComponent
  ],
  providers: [
    // ClientesService
  ]
})
export class ClientesModule { }
