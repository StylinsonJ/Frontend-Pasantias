import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort } from '@angular/material/sort';

import {SelectionModel} from '@angular/cdk/collections';

import { ExcelService} from '../../../services/excel/excel.service';

export interface GastosList {
  id: number;
  codigo: string ;
  tipo_comprobante: string;
  fec_emision: string;
  num_serie: string;
  num_comprobante: string;
  ruc_dni: number;
  razon_name: string;
  moneda: string;
  val_venta: number;
  IGV: number;
  monto_tot: number
}

const DATA: GastosList[] = [
  {id: 1, codigo: "G0001", tipo_comprobante:"boleta",
  fec_emision: "08/02/2021", num_serie: "S3R13" ,num_comprobante: "ebC0MPR0B4NT3",
  ruc_dni: 12345678901, razon_name: 'ABC', moneda: "dolar",
  val_venta: 100, IGV: 18, monto_tot: 118},
  {id: 2, codigo: "G0002", tipo_comprobante:"factura",
  fec_emision: "02/01/2021", num_serie: "S3R134" ,num_comprobante: "fC0MPR0B4NT33",
  ruc_dni: 87654321, razon_name: 'DEF', moneda: "soles",
  val_venta: 200, IGV: 36, monto_tot: 236},
];

@Component({
  selector: 'app-gasto-list',
  templateUrl: './gasto-list.component.html',
  styleUrls: ['./gasto-list.component.css']
})
export class GastoListComponent implements OnInit {

  id!: number;
  codigo!: string ;
  tipo_comprobante!: string;
  fec_emision!: string;
  num_serie!: string;
  num_comprobante!: string;
  ruc_dni!: number;
  razon_name!: string;
  moneda!: string;
  val_venta!: number;
  IGV!: number;
  monto_tot!: number

  constructor(
    private excelService: ExcelService
    ) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  //CABECERA
  displayedColumns: string[] = ['select', 'codigo', 'tipo_comprobante', 'fec_emision', 'num_serie' ,'num_comprobante','ruc_dni', 'razon_name', 'moneda','val_venta', 'IGV', 'monto_tot','actions'];
  dataSource = new MatTableDataSource<GastosList>(DATA);
  selection = new SelectionModel<GastosList>(true, []);

  //EXPORTAR A EXCEL 
  exportAsXLSX():void{
    this.excelService.exportToExcel(this.dataSource.data , 'my_export');
  }

  exportAsCSVFiltro():void{
    this.excelService.exportToExcel(this.dataSource.filteredData , 'my_export');
  }

  exportAsExcelCheck():void{
    this.excelService.exportToExcel(this.selection.selected , 'my_export');
  }

  //FILTRO
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //PAGINATOR
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   

  

  //CREAR

  //EDITAR

  //ELIMINAR
  
  //CHECK
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: GastosList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
