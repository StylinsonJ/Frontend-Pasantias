import { Component, OnInit } from '@angular/core';
import { GastosService } from 'src/app/services/contabilidad/gastos/gastos.service';
import { Tipo_Gasto, Concepto } from '../../../intefaces/gastos.interface'

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
  styleUrls: ['./gastos.component.css'],
  providers: [GastosService]
})

export class GastosComponent implements OnInit {

  

  public selectedType: Tipo_Gasto= {id: 0, name: ''};
  public types!: Tipo_Gasto[];
  
 public conceptos!: Concepto[];

  constructor(public dataSvc: GastosService) { }

  ngOnInit(): void {
    this.types = this.dataSvc.getTypes();
    
   // this.conceptos = this.dataSvc.getConceptos(); .filter(item => item.idGasto == id)
  }

  onSelect(id: number): void{
    this.conceptos = this.dataSvc.getConceptos().filter(item => item.idGasto == id);
  }

  

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

}
