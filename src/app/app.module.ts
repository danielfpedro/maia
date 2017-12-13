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
import { LayoutComponent } from './layout/layout.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserAddComponent } from './users/user-add/user-add.component';

// Services
import { UsersService } from './users/shared/users.service';

const appRoutes: Routes = [
  { path: '', component: LayoutComponent, pathMatch: 'full' },
	// Users
  { path: 'users', component: UsersListComponent},

];	

@NgModule({
  declarations: [
    AppComponent,
    // My Components
    LayoutComponent,
    UsersListComponent,
    UserAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
