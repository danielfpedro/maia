import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Fragments
 */
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MainMenuComponent } from '../shared/main-menu/main-menu.component';
import { DataTableLoaderComponent } from '../shared/data-table-loader/data-table-loader.component';

/**
 * Services
 */
import { EnderecosService } from './enderecos.service';

import {IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
  	CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
  	MaterialModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule
  ],
  declarations: [
    MainMenuComponent,
    NavbarComponent,
    DataTableLoaderComponent
  ],
  providers: [
    EnderecosService
  ],
  exports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    MainMenuComponent,
    NavbarComponent,
    DataTableLoaderComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule
  ]
})
export class SharedModule { }
