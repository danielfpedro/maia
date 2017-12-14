import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesListComponent } from './clientes-list/clientes-list.component';

// import { Route } from '../core/route.service';

// import { MatTableModule } from '@angular/material'

/**
 * Components
 */
// import { ClientesListComponent } from './clientes-list/clientes-list.component'

// const routes: Routes = Route.withShell([
//   // { path: '', redirectTo: '/console', pathMatch: 'full' },
//   { path: '', component: ClientesListComponent},
// ]);

const routes: Routes = [
  // { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '',  component: ClientesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClientesRoutingModule { }
