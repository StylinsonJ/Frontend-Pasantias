import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdGuardService as guard } from './guards/prod-guard.service';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './login/login.component';
import { ContabilidadComponent } from './modulos/contabilidad/contabilidad.component';

const routes: Routes = [
  {path:'', component: DefaultComponent,
    children: [
      {path: '', component: ContabilidadComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}}
    ]
  },
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
