import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdGuardService as guard } from './guards/prod-guard.service';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DefaultComponent } from './layouts/default/default.component';

import { FinanzasComponent } from './modulos/finanzas/finanzas.component';
import { RrhhComponent } from './modulos/rrhh/rrhh.component';
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

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: '', component: DefaultComponent, 
    children: [
      {path: '',        component: TableroComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
      {path: 'tablero', component: TableroComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
      {path: 'maestro', component: MaestroComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']},
        children: [
          {path: 'clientes',  component: ClientesComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'proveedores', component: ProveedoresComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']},
              children: [
                {path: 'add',   component: ProveeedorComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
                /* {path: 'edit/:id', component: ProveeedorComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}}, */  
              ]
          },
          {path: 'bancos',          component: BancosMaestroComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'catalogos',       component: CatalogosComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'organizacion',    component: OrganizacionComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
          {path: 'tablas-generales', component: TablasGeneralesComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
        ]
      },
  
      {path: 'gastos',  component: GastosComponent,  canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
      {path: 'ventas',  component: VentasComponent,  canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
      {path: 'compras', component: ComprasComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
      {path: 'almacen', component: AlmacenComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
      {path: 'finanzas',component: FinanzasComponent,canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
      {path: 'rrhh',    component: RrhhComponent,    canActivate: [guard], data: { expectedRol: ['admin', 'user']}}
    ]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
