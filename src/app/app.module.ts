import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { interceptorProvider } from './interceptors/prod-interceptor.service';
import { MaterialModule } from './material.module';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { DefaultModule } from './layouts/default/default.module';

import { ComprasComponent } from './modulos/home/compras/compras.component';
import { GastosComponent } from './modulos/home/gastos/gastos.component';
import { VentasComponent } from './modulos/home/ventas/ventas.component';
import { ClientesComponent } from './modulos/maestro/clientes/clientes.component';
import { ProveedoresComponent } from './modulos/maestro/proveedores/proveedores.component';
import { BancosMaestroComponent } from './modulos/maestro/bancos-maestro/bancos-maestro.component';
import { BancosFinanzasComponent } from './modulos/finanzas/bancos-finanzas/bancos-finanzas.component';
import { AlmacenComponent } from './modulos/almacen/almacen.component';
import { FinanzasComponent } from './modulos/finanzas/finanzas.component';
import { HomeComponent } from './modulos/home/home.component';
import { MaestroComponent } from './modulos/maestro/maestro.component';
import { RrhhComponent } from './modulos/rrhh/rrhh.component';

import { ProveedoresService } from './services/maestro/proveedores/proveedores.service';
import { ProveeedorComponent } from './modulos/maestro/proveedores/proveeedor/proveeedor.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// External
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,

    AlmacenComponent,
    FinanzasComponent,
    HomeComponent,
    MaestroComponent,
    RrhhComponent,

    ClientesComponent,
    ProveedoresComponent,
    ProveeedorComponent,

    BancosMaestroComponent,
    BancosFinanzasComponent,
    ComprasComponent,
    GastosComponent,
    VentasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    DefaultModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ProveedoresService, interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
