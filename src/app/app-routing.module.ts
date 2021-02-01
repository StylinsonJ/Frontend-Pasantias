import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContabilidadComponent } from './modulos/contabilidad/contabilidad.component';
import { TableroComponent } from './modulos/tablero/tablero.component';
import { FinanzasComponent } from './modulos/finanzas/finanzas.component';
import { RrhhComponent } from './modulos/rrhh/rrhh.component';
import { AlmacenComponent } from './modulos/almacen/almacen.component';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'nav', component: NavComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path:'tablero', component: TableroComponent},
  {path:'almacen', component: AlmacenComponent},
  {path:'contabilidad', component: ContabilidadComponent},
  {path:'finanzas', component: FinanzasComponent},
  {path:'rrhh', component: RrhhComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
