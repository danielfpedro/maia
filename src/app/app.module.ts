import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 3rd party Modules
import { MaterialModule } from './material.module';
import { MatTableModule, MatPaginatorModule } from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout';

// My Components
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { PiriComponent } from './users/piri/piri.component';

// import { Route } from './core/route.service';
import { ShellComponent } from './core/shell/shell.component';

import { ConsoleModule } from './console/console.module';

// Services
import { UsersService } from './users/shared/users.service';

// const appRoutes: Routes = [
//   { path: '', component: LayoutComponent, pathMatch: 'full' },
// 	// Users
//   { path: 'users', component: UsersListComponent},

// ];	

const appRoutes: Routes = [
  // { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'console', loadChildren: './console/console.module@ConsoleModule' },
];

@NgModule({
  declarations: [
    AppComponent,
    // My Components
    UsersListComponent,
    UserAddComponent,
    PiriComponent,
    ShellComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
        ConsoleModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // 3rd party modules
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    FlexLayoutModule
  ],
  providers: [
    // Services
    UsersService,
  ],
  entryComponents: [
    UserAddComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
