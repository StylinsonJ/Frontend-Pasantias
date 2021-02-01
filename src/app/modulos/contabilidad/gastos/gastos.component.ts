import { Component, OnInit } from '@angular/core';
import { GastosService } from 'src/app/services/contabilidad/gastos/gastos.service';

interface Gasto{
  value: string;
  viewValue: string;
}

interface Concepto{
  value: string;
  viewValue: string;
}

interface Documento{
  value: string;
  viewValue: string;
}

interface Pago{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  constructor(public service: GastosService) { }

  types: Gasto[] = [
    {value: '1', viewValue: 'Ventas'},
    {value: '2', viewValue: 'Administracion'},
    {value: '3', viewValue: 'Comun'}
  ];

  conceptos: Concepto[] = [
    {value: '1', viewValue: 'Logistica'},
    {value: '2', viewValue: 'Publicidad'},
    {value: '3', viewValue: 'Otros'}
  ];

  docs: Documento[] = [
    {value: '1', viewValue: 'Factura'},
    {value: '2', viewValue: 'Boleta'},
    {value: '3', viewValue: 'RxH'},
    {value: '4', viewValue: 'Ticket'},
    {value: '5', viewValue: 'Otros'}
  ];

  estados: Pago[] = [
    {value: '1', viewValue: 'Pagado'},
    {value: '2', viewValue: 'Pendiente'},
    {value: '3', viewValue: 'Credito'},
  ];


  ngOnInit(): void {
  }

}
