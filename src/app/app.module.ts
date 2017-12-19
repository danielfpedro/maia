import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// 3rd party Modules
import { MaterialModule } from './modules/shared/material.module';
// Modules
import { ClientesModule } from './modules/clientes/clientes.module';

// Components
import { NewDataService } from './components/services/new-data';
import { DataTableService } from './components/services/data-table.service';

@NgModule({
  imports: [
    //BrowserModule,
    // BrowserAnimationsModule,
    // // RouterModule.forRoot(appRoutes, {enableTracing: true}),
    // HttpClientModule,
    // FormsModule,
    // ReactiveFormsModule,
    // // 3rd party modules
    // MaterialModule,
    // Modules
    // Angular
    HttpClientModule,
    // App
    ClientesModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    NewDataService,
    DataTableService
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
