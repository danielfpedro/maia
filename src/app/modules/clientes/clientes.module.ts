import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

// Layout
import { DefaultLayoutComponent } from '../../layouts/default-layout.component';

/**
 * Modules
 */
import { SharedModule } from '../shared/shared.module';

/**
 * Components
 */
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { ClientesAddComponent } from './clientes-add/clientes-add.component';

/**
 * Router
 */
// // import { ClientesRoutingModule } from './clientes-routing.module';

const routesClientes: Routes = [
  // { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '', component: ClientesListComponent },
];
const routes: Routes = [
  {
    path: 'clientes',
    children: [
      // Default Layout
      {
        path: '',
        component: DefaultLayoutComponent,
        children: [
        { path: 'list', component: ClientesListComponent },
        ]
      },
    ]
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SharedModule,
    // ClientesRoutingModule
    // Routing
    // ConsoleRounting
  ],
  exports: [RouterModule],
  declarations: [
    // MainMenuComponent,
    // Layout
    DefaultLayoutComponent,
    // Components
    ClientesListComponent,
    ClientesAddComponent
  ],
  providers: [
    // ClientesService
  ]
})
export class ClientesModule { }
