import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DefaultComponent } from './default.component';
import { TableroComponent } from '../modulos/tablero/tablero.component';
import { ContabilidadComponent } from '../modulos/contabilidad/contabilidad.component';

@NgModule({
  declarations: [
    DefaultComponent,
    TableroComponent,
    ContabilidadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  providers: [
  ]
})
export class DefaultModule { }
