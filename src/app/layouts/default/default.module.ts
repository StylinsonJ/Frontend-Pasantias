import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';

import { AlmacenComponent } from 'src/app/modulos/almacen/almacen.component';
import { FinanzasComponent } from '../../modulos/finanzas/finanzas.component'
import { HomeComponent } from 'src/app/modulos/home/home.component';
import { MaestroComponent } from 'src/app/modulos/maestro/maestro.component';
import { RrhhComponent } from 'src/app/modulos/rrhh/rrhh.component';

@NgModule({
  declarations: [
    DefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule
  ]
})
export class DefaultModule { }
