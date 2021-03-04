// External
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { interceptorProvider } from './interceptors/prod-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Forms module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Routing module for router service
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';
//Material Angular
import { MaterialModule } from './material.module';

//LOGIN-DEFAULT-PAGENOTFOUND
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { DefaultModule } from './layouts/default/default.module';
import { SaveNotifComponent } from './layouts/notificaciones/save-notif';

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
        import { GastoComponent } from './modulos/gastos/gasto/gasto.component';
        import { GastoListComponent } from './modulos/gastos/gasto-list/gasto-list.component';
               //Tablero
      import { TableroComponent } from './modulos/tablero/tablero.component';
import { ContactoComponent } from './modulos/compras/compra/contacto/contacto.component';
import { DetalleComponent } from './modulos/almacen/productos/detalle/detalle.component';
import { ClientesService } from './services/maestro/clientes.service';
import { BancoComponent } from './modulos/maestro/bancos-maestro/banco/banco.component';
import { VentaComponent } from './modulos/ventas/venta/venta.component';
import { VentaListComponent } from './modulos/ventas/venta-list/venta-list.component';
import { ComprobanteComponent } from './modulos/ventas/comprobante/comprobante.component';
import { StockComponent } from './modulos/ventas/stock/stock.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { CatalogosComponent } from './modulos/maestro/catalogos/catalogos.component';
import { BienesComponent } from './modulos/maestro/catalogos/bienes/bienes.component';
import { ServiciosComponent } from './modulos/maestro/catalogos/servicios/servicios.component';
import { BieneComponent } from './modulos/maestro/catalogos/bienes/biene/biene.component';
import { ServicioComponent } from './modulos/maestro/catalogos/servicios/servicio/servicio.component';
import { OrganizacionComponent } from './modulos/maestro/organizacion/organizacion.component';
import { UnidadesComponent } from './modulos/maestro/organizacion/unidades/unidades.component';
import { AreasComponent } from './modulos/maestro/organizacion/areas/areas.component';
import { TablasGeneralesComponent } from './modulos/maestro/tablas-generales/tablas-generales.component';
import { UnidadMedidaComponent } from './modulos/maestro/tablas-generales/unidad-medida/unidad-medida.component';
import { EstadosComponent } from './modulos/maestro/tablas-generales/estados/estados.component';
import { ClasificacionComponent } from './modulos/maestro/tablas-generales/clasificacion/clasificacion.component';
import { TipoPagoComponent } from './modulos/maestro/tablas-generales/tipo-pago/tipo-pago.component';
import { TipoVentaComponent } from './modulos/maestro/tablas-generales/tipo-venta/tipo-venta.component';
import { SalidaComponent } from './modulos/almacen/salida/salida.component';
import { ConsultaStockComponent } from './modulos/almacen/consulta-stock/consulta-stock.component';
import { ConsultaActivosComponent } from './modulos/almacen/consulta-activos/consulta-activos.component';
import { OrdenTrasladoComponent } from './modulos/almacen/orden-traslado/orden-traslado.component';
import { NuevaOtComponent } from './modulos/almacen/orden-traslado/nueva-ot/nueva-ot.component';
import { ConsultaOtComponent } from './modulos/almacen/orden-traslado/consulta-ot/consulta-ot.component';
import { ConsultaOrgComponent } from './modulos/maestro/organizacion/consulta-org/consulta-org.component';
import { FacturaGtComponent } from './modulos/finanzas/pagos/factura-gt/factura-gt.component';
import { RrhhListComponent } from './modulos/rrhh/rrhh-list/rrhh-list.component';

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
    DetalleComponent,
    BancoComponent,
    GastoComponent,
    GastoListComponent,
    VentaComponent,
    VentaListComponent,
    ComprobanteComponent,
    StockComponent,
    DashboardComponent,
    CatalogosComponent,
    BienesComponent,
    ServiciosComponent,
    BieneComponent,
    ServicioComponent,
    OrganizacionComponent,
    UnidadesComponent,
    AreasComponent,
    TablasGeneralesComponent,
    UnidadMedidaComponent,
    EstadosComponent,
    ClasificacionComponent,
    TipoPagoComponent,
    TipoVentaComponent,
    SalidaComponent,
    ConsultaStockComponent,
    ConsultaActivosComponent,
    OrdenTrasladoComponent,
    NuevaOtComponent,
    ConsultaOtComponent,
    SaveNotifComponent,
    ConsultaOrgComponent,
    FacturaGtComponent,
    RrhhListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    DefaultModule,
    NgbModule,
    ReactiveFormsModule,
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
