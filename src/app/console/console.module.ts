import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesModule } from './clientes/clientes.module';
import { ClientesRoutingModule } from './clientes/clientes-routing.module';

/**
 * Router
 */
// import { ConsoleRounting } from './console-routing.module';
/**
 * Components
 */


@NgModule({
  imports: [
    ClientesModule,
    CommonModule,
    // ClientesRoutingModule
    // Routing
    // ConsoleRounting
  ],
  declarations: [
    // UserListComponent
  ],
  providers: [
    // ClientesService
  ]
})
export class ConsoleModule { }
