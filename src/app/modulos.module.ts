import { NgModule } from '@angular/core';
//Modulos
         //Maestro
import { MaestroComponent } from './modulos/maestro/maestro.component';
    import { ClientesComponent } from './modulos/maestro/clientes/clientes.component';
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
          //Ventas
import { VentasComponent } from './modulos/ventas/ventas.component';
          //Gastos
import { GastosComponent } from './modulos/gastos/gastos.component';


@NgModule({
  declarations: [
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
    VentasComponent,
    GastosComponent
  ],
  exports: [
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
    VentasComponent,
    GastosComponent
  ]
})
export class ModulosModule { }
