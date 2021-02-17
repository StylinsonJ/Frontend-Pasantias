// External
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { interceptorProvider } from './interceptors/prod-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//LOGIN-DEFAULT-PAGENOTFOUND
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { DefaultModule } from './layouts/default/default.module';
//Material Angular
import { MaterialModule } from './material.module';
//Modulos
//import { ModulosModule } from './modulos.module';
//Services
import { ProveedoresService } from './services/maestro/proveedores.service';
import { PersonaContactoService } from './services/maestro/persona-contacto.service';

//Modulos
         //Maestro
         import { MaestroComponent } from './modulos/maestro/maestro.component';
         import { ClientesComponent } from './modulos/maestro/clientes/clientes.component';
              import { ClienteComponent } from './modulos/maestro/clientes/cliente/cliente.component';
         import { ProveedoresComponent } from './modulos/maestro/proveedores/proveedores.component';
             import { ProveeedorComponent } from './modulos/maestro/proveedores/proveeedor/proveeedor.component';
         import { BancosMaestroComponent } from './modulos/maestro/bancos-maestro/bancos-maestro.component';
               //Finanzas
     import { FinanzasComponent } from './modulos/finanzas/finanzas.component';
         import { BancosFinanzasComponent } from './modulos/finanzas/bancos-finanzas/bancos-finanzas.component';
         import { PagosComponent } from './modulos/finanzas/pagos/pagos.component';
         import { CobrosComponent } from './modulos/finanzas/cobros/cobros.component';
               //Almacen
     import { AlmacenComponent } from './modulos/almacen/almacen.component';
         import { SucursalComponent } from './modulos/almacen/sucursal/sucursal.component';
         import { EntradaComponent } from './modulos/almacen/entrada/entrada.component';
         import { ProductosComponent } from './modulos/almacen/productos/productos.component';
               //RRHH
     import { RrhhComponent } from './modulos/rrhh/rrhh.component';
               //Compras
     import { ComprasComponent } from './modulos/compras/compras.component';
     import { CompraComponent } from './modulos/compras/compra/compra.component';
     import { CompraListComponent } from './modulos/compras/compra-list/compra-list.component';
   
               //Ventas
     import { VentasComponent } from './modulos/ventas/ventas.component';
               //Gastos
     import { GastosComponent } from './modulos/gastos/gastos.component';
               //Tablero
      import { TableroComponent } from './modulos/tablero/tablero.component';
import { ContactoComponent } from './modulos/compras/compra/contacto/contacto.component';
import { DetalleComponent } from './modulos/almacen/productos/detalle/detalle.component';
import { ClientesService } from './services/maestro/clientes.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
 //   ModulosModule,

    AlmacenComponent,
    EntradaComponent,
    ProductosComponent,
    SucursalComponent,

    FinanzasComponent,
    BancosFinanzasComponent,
    PagosComponent,
    CobrosComponent,

    MaestroComponent,
    ClientesComponent,
    ProveedoresComponent,
    ProveeedorComponent,
    BancosMaestroComponent,

    RrhhComponent,
    ComprasComponent,
    CompraComponent,
    CompraListComponent,
    VentasComponent,
    GastosComponent,
    TableroComponent,
    CompraComponent,
    ClienteComponent,
    ContactoComponent,
    DetalleComponent
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
  providers: [ProveedoresService,
              PersonaContactoService,
              ClientesService,
              
              interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
