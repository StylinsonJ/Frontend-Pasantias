import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort } from '@angular/material/sort';

import {SelectionModel} from '@angular/cdk/collections';

import { ExcelService} from '../../../services/excel/excel.service';

export interface Ingreso {
  id: number;
  ruc_dni: number;
  razon_name: string;
  fec_doc: string;
  estado: string;
  accion: string;
}

const DATA: Ingreso[] = [
  {id:1, ruc_dni: 12345678901, razon_name: 'ABC',fec_doc: "08/02/2021",   estado: "pendiente", accion:""},
  {id:2, ruc_dni: 700089012,   razon_name: 'DEF',fec_doc: "08/02/2011",   estado: "pendiente", accion:""},
];

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {

  id!: number;
  ruc_dni!: number;
  razon_name!: string;
  fec_doc!: string;
  estado!: string;

  constructor(private excelService: ExcelService) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

   //CABECERA
   displayedColumns: string[] = ['select', 'id', 'ruc_dni', 'razon_name', 'fec_doc', 'estado', 'accion'];
   dataSource = new MatTableDataSource<Ingreso>(DATA);
   selection = new SelectionModel<Ingreso>(true, []);
 
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
  checkboxLabel(row?: Ingreso): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
