import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TableroComponent } from './modulos/tablero/tablero.component';
import { NavComponent } from './components/nav/nav.component';
import { ContabilidadComponent } from './modulos/contabilidad/contabilidad.component';
import { AlmacenComponent } from './modulos/almacen/almacen.component';
import { FinanzasComponent } from './modulos/finanzas/finanzas.component';
import {MatCardModule} from '@angular/material/card'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button'; 
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    AlmacenComponent,
    ContabilidadComponent,
    FinanzasComponent,
    TableroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
