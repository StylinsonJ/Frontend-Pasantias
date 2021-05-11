import { Component, OnInit } from '@angular/core';
import { UnidadMedidaComponent } from './unidad-medida/unidad-medida.component';

export interface Referencia {
 color: string;
 cols: number;
 rows: number;
}

@Component({
  selector: 'app-tablas-generales',
  templateUrl: './tablas-generales.component.html',
  styleUrls: ['./tablas-generales.component.css']
})
export class TablasGeneralesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  referencias: Referencia[] = [
    {cols:3, rows:10, color:'lightblue' },
    {cols:1, rows:10, color:'lightgreen'},
   // {text:'Tres',   cols:1, rows:1, color:'lightpink'},
   // {text:'Cuatro', cols:2, rows:1, color:'red'},
  ]

}
