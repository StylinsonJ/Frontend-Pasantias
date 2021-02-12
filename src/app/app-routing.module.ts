import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdGuardService as guard } from './guards/prod-guard.service';

import { FinanzasComponent } from './modulos/finanzas/finanzas.component';
import { RrhhComponent } from './modulos/rrhh/rrhh.component';
import { AlmacenComponent } from './modulos/almacen/almacen.component';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DefaultComponent } from './layouts/default/default.component';

import { MaestroComponent } from './modulos/maestro/maestro.component';
import { ComprasComponent } from './modulos/compras/compras.component';
import { GastosComponent } from './modulos/gastos/gastos.component';
import { VentasComponent } from './modulos/ventas/ventas.component';
import { TableroComponent } from './modulos/tablero/tablero.component';
import { ProveedoresComponent } from './modulos/maestro/proveedores/proveedores.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: '', component: DefaultComponent, 
    children: [
      {path: 'almacen', component: AlmacenComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
      {path: 'tablero', component: TableroComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
      {path: 'maestro', component: MaestroComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
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
