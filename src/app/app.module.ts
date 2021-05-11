// External
import { ToastrModule }            from 'ngx-toastr';
import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { interceptorProvider }     from './interceptors/prod-interceptor.service';
import { NgbModule }               from '@ng-bootstrap/ng-bootstrap';
// Forms module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Routing module for router service
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';
// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';
// Material Angular
import { MaterialModule }   from './material.module';
// LOGIN-DEFAULT-PAGENOTFOUND
import { PageNotFoundComponent }from './page-not-found/page-not-found.component';
import { LoginComponent }       from './login/login.component';
import { DefaultModule }        from './layouts/default/default.module';
import { SaveNotifComponent }   from './layouts/notificaciones/save-notif';
// Services
import { ProveedoresService }     from './services/maestro/proveedores.service';
import { PersonaContactoService } from './services/maestro/persona-contacto.service';
import { ClientesService }        from './services/maestro/clientes.service';
import { BancosMaestroService }   from './services/maestro/bancos-maestro.service';

//------------------Modulos---------------------
// Tablero
import { TableroComponent }         from './modulos/tablero/tablero.component';
// Maestro
import { MaestroComponent }         from './modulos/maestro/maestro.component';

import { ClientesComponent }        from './modulos/maestro/clientes/clientes.component';
import { ClienteComponent }         from './modulos/maestro/clientes/cliente/cliente.component';
import { DeleteComponent }          from './modulos/maestro/clientes/delete/delete.component';

import { ProveedoresComponent }     from './modulos/maestro/proveedores/proveedores.component';
import { ProveeedorComponent }      from './modulos/maestro/proveedores/proveeedor/proveeedor.component';

import { BancosMaestroComponent }   from './modulos/maestro/bancos-maestro/bancos-maestro.component';
import { BancoComponent }           from './modulos/maestro/bancos-maestro/banco/banco.component';

import { CatalogosComponent }       from './modulos/maestro/catalogos/catalogos.component';
  import { BienesComponent }        from './modulos/maestro/catalogos/bienes/bienes.component';
    import { BieneComponent }       from './modulos/maestro/catalogos/bienes/biene/biene.component';
    import { BieneListComponent }   from './modulos/maestro/catalogos/bienes/biene-list/biene-list.component';
  import { ServiciosComponent }     from './modulos/maestro/catalogos/servicios/servicios.component';
    import { ServicioComponent }    from './modulos/maestro/catalogos/servicios/servicio/servicio.component';
    import { ServicioListComponent }from './modulos/maestro/catalogos/servicios/servicio-list/servicio-list.component';

import { OrganizacionComponent }    from './modulos/maestro/organizacion/organizacion.component';
import { ConsultaOrgComponent }     from './modulos/maestro/organizacion/consulta-org/consulta-org.component';
import { AddOrgComponent }          from './modulos/maestro/organizacion/add-org/add-org.component';

import { TablasGeneralesComponent } from './modulos/maestro/tablas-generales/tablas-generales.component';
  import { UnidadMedidaComponent }  from './modulos/maestro/tablas-generales/unidad-medida/unidad-medida.component';
  import { EstadosComponent }       from './modulos/maestro/tablas-generales/estados/estados.component';
  import { ClasificacionComponent } from './modulos/maestro/tablas-generales/clasificacion/clasificacion.component';
  import { TipoPagoComponent }      from './modulos/maestro/tablas-generales/tipo-pago/tipo-pago.component';
  import { TipoVentaComponent }     from './modulos/maestro/tablas-generales/tipo-venta/tipo-venta.component';

//Ventas
import { VentasComponent }          from './modulos/ventas/ventas.component';
import { VentaComponent }           from './modulos/ventas/venta/venta.component';
import { CatalogoAlmacenComponent}  from './modulos/ventas/venta/catalogo-almacen/catalogo-almacen.component';
import { FlujoBienesComponent}      from './modulos/ventas/venta/catalogo-almacen/flujo-bienes/flujo-bienes.component';
import { FlujoServiciosComponent}   from './modulos/ventas/venta/catalogo-almacen/flujo-servicios/flujo-servicios.component';
import { VentaListComponent }       from './modulos/ventas/venta-list/venta-list.component';

import { FiltersComponent } from './modulos/ventas/venta/catalogo-almacen/flujo-bienes/filters/filters.component';
import { ProductListComponent } from './modulos/ventas/venta/catalogo-almacen/flujo-bienes/product-list/product-list.component';
import { ProductItemComponent } from './modulos/ventas/venta/catalogo-almacen/flujo-bienes/product-list/product-item/product-item.component';
import { CartComponent } from './modulos/ventas/venta/catalogo-almacen/flujo-bienes/cart/cart.component';
import { CartItemComponent } from './modulos/ventas/venta/catalogo-almacen/flujo-bienes/cart/cart-item/cart-item.component';

//Gastos
import { GastosComponent }          from './modulos/gastos/gastos.component';
  import { GastoComponent }         from './modulos/gastos/gasto/gasto.component';
  import { GastoListComponent }     from './modulos/gastos/gasto-list/gasto-list.component';

//Compras
import { ComprasComponent }        from './modulos/compras/compras.component';
  import { CompraComponent }       from './modulos/compras/compra/compra.component';
   import { ContactoComponent }     from './modulos/compras/compra/contacto/contacto.component';
  import { CompraListComponent }   from './modulos/compras/compra-list/compra-list.component';
  
//Almacen
import { AlmacenComponent }        from './modulos/almacen/almacen.component';
import { EntradaComponent }        from './modulos/almacen/entrada/entrada.component';
import { InputBusquedaComponent } from './modulos/almacen/entrada/input-busqueda/input-busqueda.component';

import { SalidaComponent }         from './modulos/almacen/salida/salida.component';
import { ProductosComponent } from './modulos/almacen/productos/productos.component';
import { ProductoComponent } from './modulos/almacen/productos/producto/producto.component';
import { BuscarProductoComponent } from './modulos/almacen/productos/buscar-producto/buscar-producto.component';

import { ConsultaStockComponent }  from './modulos/almacen/consulta-stock/consulta-stock.component';
import { ConsultaActivosComponent }from './modulos/almacen/consulta-activos/consulta-activos.component';

import { OrdenTrasladoComponent }  from './modulos/almacen/orden-traslado/orden-traslado.component';
import { NuevaOtComponent }        from './modulos/almacen/orden-traslado/nueva-ot/nueva-ot.component';
import { ConsultaOtComponent }     from './modulos/almacen/orden-traslado/consulta-ot/consulta-ot.component';

//Finanzas
import { FinanzasComponent }       from './modulos/finanzas/finanzas.component';
import { BancosFinanzasComponent } from './modulos/finanzas/bancos-finanzas/bancos-finanzas.component';
import { PagosComponent }          from './modulos/finanzas/pagos/pagos.component';
import { FacturaGtComponent }      from './modulos/finanzas/pagos/factura-gt/factura-gt.component';
import { CobrosComponent }         from './modulos/finanzas/cobros/cobros.component';

//RRHH
import { RrhhComponent }          from './modulos/rrhh/rrhh.component';
import { RrhhListComponent }      from './modulos/rrhh/rrhh-list/rrhh-list.component';
import { RrhhAddComponent }       from './modulos/rrhh/rrhh-add/rrhh-add.component';
import { HistorialComponent }      from './modulos/rrhh/rrhh-add/historial/historial.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ReferenciasComponent } from './modulos/maestro/tablas-generales/referencias/referencias.component';
import { DashboardRrhhComponent } from './modulos/rrhh/dashboard-rrhh/dashboard-rrhh.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
 //   ModulosModule,

    AlmacenComponent,
    EntradaComponent,

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
    DeleteComponent,
    ClienteComponent,
    ContactoComponent,
    BancoComponent,
    GastoComponent,
    GastoListComponent,
    VentaComponent,
    VentaListComponent,
    CatalogosComponent,
    BienesComponent,
    ServiciosComponent,
    BieneComponent,
    ServicioComponent,
    OrganizacionComponent,
    
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
    RrhhListComponent,
    RrhhAddComponent,
    HistorialComponent,
    AddOrgComponent,
    ServicioListComponent,
    BieneListComponent,
    CatalogoAlmacenComponent,
    FlujoBienesComponent,
    FlujoServiciosComponent,
    FiltersComponent,
    ProductListComponent,
    ProductItemComponent,
    CartComponent,
    CartItemComponent,
    ProductDetailsComponent,
    InputBusquedaComponent,
  ProductDetailsComponent,
  ProductosComponent,
  ProductoComponent,
  BuscarProductoComponent,
  ReferenciasComponent,
  DashboardRrhhComponent
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
  entryComponents: [
    ClienteComponent
  ],
  providers: [ProveedoresService,
              PersonaContactoService,
              ClientesService,
              BancosMaestroService,
              
              interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
