import { Component, OnInit } from '@angular/core';

export interface PagosList {
  id: number;
  registro: string;
  ruc_dni: number;
  razon_name: string;
  fec_emi: string;
  fec_ven: string;
  estado: string;
  importe_tot: number;
  accion: string;
  accion2: string;
}
/*
const DATA: PagosList[] = [
  {id: 1, registro: 'RC001', ruc_dni: 12345678901, razon_name: 'ABC', fec_emi: '01/01/2021', fec_ven: '14/02/2021', estado: 'pendiente', importe_tot:1500},
  {id: 2, registro: 'GT001', ruc_dni: 88888888,    razon_name: 'DEF', fec_emi: '16/04/2019', fec_ven: '26/02/2021', estado: 'pendiente', importe_tot:2800},
  {id: 3, registro: 'TC001', ruc_dni: 11111111111, razon_name: 'GHI', fec_emi: '01/03/2018', fec_ven: '03/02/2021', estado: 'pendiente', importe_tot:3000},
];
*/

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
