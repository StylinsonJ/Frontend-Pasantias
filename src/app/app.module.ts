import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';
import { VentasService } from './services/contabilidad/ventas/ventas.service';

import { ContabilidadComponent } from './modulos/contabilidad/contabilidad.component';
import { GastosComponent } from './modulos/contabilidad/gastos/gastos.component';
import { VentasComponent } from './modulos/contabilidad/ventas/ventas.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    ContabilidadComponent,
    PageNotFoundComponent,
    GastosComponent,
    VentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [VentasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
