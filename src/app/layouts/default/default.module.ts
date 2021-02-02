import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { ContabilidadComponent } from 'src/app/modulos/contabilidad/contabilidad.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { VentasComponent } from 'src/app/modulos/contabilidad/ventas/ventas.component';
import { GastosComponent } from 'src/app/modulos/contabilidad/gastos/gastos.component';
import { AlmacenComponent } from 'src/app/modulos/almacen/almacen.component';
import { TableroComponent } from 'src/app/modulos/tablero/tablero.component';



@NgModule({
  declarations: [
    DefaultComponent,
    ContabilidadComponent,
    VentasComponent,
    GastosComponent,
    AlmacenComponent,
    TableroComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule
  ]
})
export class DefaultModule { }
