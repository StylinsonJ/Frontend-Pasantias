import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavComponent } from './nav/nav.component';
import { ContabilidadComponent } from './modulos/contabilidad/contabilidad.component';
import { DefaultComponent } from './default/default.component'
import { TableroComponent } from './modulos/tablero/tablero.component';

const routes: Routes = [{
  path:'', 
  component: NavComponent,
  children: [{
    path: '',
    component: TableroComponent
    },{
    path: 'contabilidad', 
    component: ContabilidadComponent
  }]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
