import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContabilidadComponent } from './modulos/contabilidad/contabilidad.component';
import { TableroComponent } from './modulos/tablero/tablero.component';
import { FinanzasComponent } from './modulos/finanzas/finanzas.component';
import { RrhhComponent } from './modulos/rrhh/rrhh.component';
import { AlmacenComponent } from './modulos/almacen/almacen.component';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DefaultComponent } from './layouts/default/default.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: '', component: DefaultComponent, 
    children: [
      {path: '', component: AlmacenComponent},
      {path: 'tablero', component: TableroComponent},
      {path: 'contabilidad', component: ContabilidadComponent},
      {path:'almacen', component: AlmacenComponent}
    ]},
  {path:'finanzas', component: FinanzasComponent},
  {path:'rrhh', component: RrhhComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
