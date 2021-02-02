import { Injectable } from '@angular/core';
import { Tipo_Gasto, Concepto } from '../../../intefaces/gastos.interface';

@Injectable({
  providedIn: 'root'
})

export class GastosService {

  private types: Tipo_Gasto[] = [
    {
      id:1,
      name: 'Ventas'
    },
    {
      id:2,
      name: 'Administracion' 
    },
    {
      id:3,
      name: 'Comun' 
    }
  ];

  private conceptos: Concepto[]=[
    {id:1,idGasto:1,name: 'Logistica'},
    {id:2,idGasto:1,name: 'Publicidad'},
    {id:3,idGasto:1,name: 'Otros'},

    {id:4,idGasto:2,name: 'Multas'},
    {id:5,idGasto:2,name: 'Tributos'},
    {id:6,idGasto:2,name: 'Licencias'},
    {id:7,idGasto:2,name: 'Cobranzas'},
    {id:9,idGasto:2,name: 'Otros'},
    
    {id:10,idGasto:3,name: 'Alquiler'},
    {id:11,idGasto:3,name: 'Seguros'},
    {id:12,idGasto:3,name: 'Depresiacion'},
    {id:13,idGasto:3,name: 'Servicios Publicos'},
    {id:14,idGasto:3,name: 'Combustibles'},
    {id:15,idGasto:3,name: 'Suministro'},
    {id:16,idGasto:3,name: 'Alimentacion'},
    {id:17,idGasto:3,name: 'Otros'},

  ];

  getTypes(): Tipo_Gasto[]{
    return this.types;
  }

  getConceptos(): Concepto[]{
    return this.conceptos;
  }
}
