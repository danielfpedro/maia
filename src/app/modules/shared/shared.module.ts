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

@NgModule({
  imports: [
  	CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
  	MaterialModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MainMenuComponent,
    NavbarComponent
  ],
  exports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    MainMenuComponent,
    NavbarComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
