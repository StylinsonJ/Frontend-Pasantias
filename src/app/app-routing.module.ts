import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdGuardService as guard } from './guards/prod-guard.service';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DefaultComponent } from './layouts/default/default.component';

import { FinanzasComponent } from './modulos/finanzas/finanzas.component';
import { RrhhComponent } from './modulos/rrhh/rrhh.component';
import { RrhhListComponent } from './modulos/rrhh/rrhh-list/rrhh-list.component';
import { AlmacenComponent } from './modulos/almacen/almacen.component';

import { MaestroComponent } from './modulos/maestro/maestro.component';
import { ClientesComponent  } from './modulos/maestro/clientes/clientes.component';
import { ClienteComponent } from './modulos/maestro/clientes/cliente/cliente.component';

import { ComprasComponent } from './modulos/compras/compras.component';
import { GastosComponent } from './modulos/gastos/gastos.component';
import { VentasComponent } from './modulos/ventas/ventas.component';
import { TableroComponent } from './modulos/tablero/tablero.component';
import { ProveeedorComponent } from './modulos/maestro/proveedores/proveeedor/proveeedor.component';
import { ProveedoresComponent } from './modulos/maestro/proveedores/proveedores.component';
import { BancosMaestroComponent } from './modulos/maestro/bancos-maestro/bancos-maestro.component';
import { CatalogosComponent } from './modulos/maestro/catalogos/catalogos.component';
import { OrganizacionComponent } from './modulos/maestro/organizacion/organizacion.component';
import { TablasGeneralesComponent } from './modulos/maestro/tablas-generales/tablas-generales.component';
import { GastoListComponent } from './modulos/gastos/gasto-list/gasto-list.component';
import { GastoComponent } from './modulos/gastos/gasto/gasto.component';
import { PagosComponent } from './modulos/finanzas/pagos/pagos.component';
import { CobrosComponent } from './modulos/finanzas/cobros/cobros.component';
import { BancosFinanzasComponent } from './modulos/finanzas/bancos-finanzas/bancos-finanzas.component';
import { ConsultaOrgComponent } from './modulos/maestro/organizacion/consulta-org/consulta-org.component';
import { VentaListComponent } from './modulos/ventas/venta-list/venta-list.component';
import { VentaComponent } from './modulos/ventas/venta/venta.component';
import { EntradaComponent } from './modulos/almacen/entrada/entrada.component';
import { SalidaComponent } from './modulos/almacen/salida/salida.component';
import { ConsultaStockComponent } from './modulos/almacen/consulta-stock/consulta-stock.component';
import { CompraListComponent } from './modulos/compras/compra-list/compra-list.component';
import { CompraComponent } from './modulos/compras/compra/compra.component';
import { RrhhAddComponent } from './modulos/rrhh/rrhh-add/rrhh-add.component';
import { BienesComponent } from './modulos/maestro/catalogos/bienes/bienes.component';
import { ServiciosComponent } from './modulos/maestro/catalogos/servicios/servicios.component';
import { UnidadMedidaComponent } from './modulos/maestro/tablas-generales/unidad-medida/unidad-medida.component';
import { EstadosComponent } from './modulos/maestro/tablas-generales/estados/estados.component';
import { ClasificacionComponent } from './modulos/maestro/tablas-generales/clasificacion/clasificacion.component';
import { TipoPagoComponent } from './modulos/maestro/tablas-generales/tipo-pago/tipo-pago.component';
import { TipoVentaComponent } from './modulos/maestro/tablas-generales/tipo-venta/tipo-venta.component';
import { ConsultaActivosComponent } from './modulos/almacen/consulta-activos/consulta-activos.component';
import { OrdenTrasladoComponent } from './modulos/almacen/orden-traslado/orden-traslado.component';
import { ConsultaOtComponent } from './modulos/almacen/orden-traslado/consulta-ot/consulta-ot.component';
import { NuevaOtComponent } from './modulos/almacen/orden-traslado/nueva-ot/nueva-ot.component';
import { CatalogoAlmacenComponent } from './modulos/ventas/venta/catalogo-almacen/catalogo-almacen.component';
import { FlujoBienesComponent } from './modulos/ventas/venta/catalogo-almacen/flujo-bienes/flujo-bienes.component';
import { FlujoServiciosComponent } from './modulos/ventas/venta/catalogo-almacen/flujo-servicios/flujo-servicios.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductosComponent } from './modulos/almacen/productos/productos.component';
import { DashboardRrhhComponent } from './modulos/rrhh/dashboard-rrhh/dashboard-rrhh.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: '', component: DefaultComponent, 
    children: [
      {path: '',        component: TableroComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
      {path: 'tablero', component: TableroComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
      {path: 'maestro', component: MaestroComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']},
        children: [
          {path: '',  redirectTo: '/maestro/proveedores', pathMatch: 'full'},
          {path: 'clientes',  component: ClientesComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'proveedores', component: ProveedoresComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']},
              children: [
                {path: 'add',   component: ProveeedorComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
                {path: 'edit/:id', component: ProveeedorComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},  
              ]
          },
          {path: 'bancos',          component: BancosMaestroComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path:'catalogos',       component: CatalogosComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']},
              children: [
                {path: 'bienes',   component: BienesComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
                {path: 'servicios', component: ServiciosComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},  
              ]
          },
          {path: 'organizacion',    component: OrganizacionComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'tablas-generales', component: TablasGeneralesComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']},
            children: [
              {path: 'unidad-medida',   component: UnidadMedidaComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
              {path: 'estados', component: EstadosComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},  
              {path: 'clasificacion',   component: ClasificacionComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
              {path: 'tipo-pago', component: TipoPagoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},  
              {path: 'tipo-venta', component: TipoVentaComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},  
            ]
          },
        ]
      },
      {path: 'ventas',  component: VentasComponent,  canActivate: [guard], data: { expectedRol: ['admin', 'user']},
        children: [
          {path: '',  redirectTo: '/ventas/ventas-lista', pathMatch: 'full'},
          {path: 'ventas-lista',  component: VentaListComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'ventas-add',    component: VentaComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'catalogo-almacen',       component: CatalogoAlmacenComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']},
              children: [
                {path: 'bienes',    component: FlujoBienesComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
                {path: 'servicios', component: FlujoServiciosComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},  
              ]
          },
        ] 
      },
      {path: 'producto-detalle',    component: ProductDetailsComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
    
         
      {path: 'gastos', component: GastosComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']},
        children: [
          {path: '',  redirectTo: '/gastos/gastos-lista', pathMatch: 'full'},
          {path: 'gastos-lista',  component: GastoListComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'gastos-add', component: GastoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
        ]
      },
      {path: 'compras', component: ComprasComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']},
        children: [
          {path: '',  redirectTo: '/compras/compras-lista', pathMatch: 'full'},
          {path: 'compras-lista',  component: CompraListComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'compras-add', component: CompraComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
        ]
      },
      {path: 'almacen', component: AlmacenComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']},
        children: [
          {path: '',  redirectTo: '/almacen/entrada', pathMatch: 'full'},
          {path: 'entrada',  component: EntradaComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'salida', component: SalidaComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'consulta-stock', component: ConsultaStockComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'consulta-activos', component: ConsultaActivosComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'orden-traslado', component: OrdenTrasladoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']},
            children: [
              {path: 'consulta-ot',  component: ConsultaOtComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
              {path: 'nueva-ot', component: NuevaOtComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
            ]
          },
          {path: 'productos',    component: ProductosComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
         

        ]
      },
      {path: 'finanzas',component: FinanzasComponent,canActivate: [guard], data: { expectedRol: ['admin', 'user']},
        children: [
          {path: '',  redirectTo: '/finanzas/pagos', pathMatch: 'full'},
          {path: 'pagos',  component: PagosComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'cobros', component: CobrosComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'bancos-finanzas', component: BancosFinanzasComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
        ]}, 
      {path: 'rrhh',    component: RrhhComponent,    canActivate: [guard], data: { expectedRol: ['admin', 'user']},
        children: [
          {path: '',  redirectTo: '/rrhh/rrhh-add', pathMatch: 'full'},
          {path: 'dashboard-rrhh',  component: DashboardRrhhComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          
          {path: 'rrhh-lista',  component: RrhhListComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'rrhh-add', component: RrhhAddComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
        ]
      }
    ]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
