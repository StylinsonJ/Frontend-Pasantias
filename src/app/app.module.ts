import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TableroComponent } from './modulos/tablero/tablero.component';
import { NavComponent } from './nav/nav.component';
import { ContabilidadComponent } from './modulos/contabilidad/contabilidad.component';
import { AlmacenComponent } from './modulos/almacen/almacen.component';
import { FinanzasComponent } from './modulos/finanzas/finanzas.component';

@NgModule({
  declarations: [
    AppComponent,
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
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
