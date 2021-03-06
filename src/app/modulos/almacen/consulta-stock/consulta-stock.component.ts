import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort } from '@angular/material/sort';

import {SelectionModel} from '@angular/cdk/collections';

import { ExcelService} from '../../../services/excel/excel.service';


export interface stockList {
  id: number;
  codigo: string;
  producto: string;
  descripcion: string;
  codigo_int: string;
  marca: string;
  modelo: string;
  serie: string;
  cant_stock: number;
  costo_uni: number;
  venta_cant: number;
  venta_uni: number
}

const DATA: stockList[] = [
  { id:1,codigo:'1234', producto: 'telefono', descripcion: 'android',codigo_int: 'TELF001',marca:'xiaomi',modelo:'note9',
    serie:'XIA991',cant_stock:10, costo_uni: 700, venta_cant:100,venta_uni:88 },
  { id:2,codigo:'5678', producto: 'laptop',   descripcion: 'de japon',codigo_int: 'LAP001',marca:'HP',modelo:'SO',
  serie:'HP99A991',cant_stock:50, costo_uni: 700, venta_cant:100,venta_uni:88},
];

@Component({
  selector: 'app-consulta-stock',
  templateUrl: './consulta-stock.component.html',
  styleUrls: ['./consulta-stock.component.css']
})
export class ConsultaStockComponent implements OnInit {

    id!: number;
    codigo!:number;
    producto!: string;
    descripcion!: string;
    codigo_int!: string;
    marca!: string;
    modelo!: string;
    serie!: string;
    cant_stock!: number;
    costo_uni!: number;
    venta_cant!: number;
    venta_uni!: number;
  
     //CABECERA
     displayedColumns: string[] = ['select', 'id', 'codigo','producto', 'descripcion', 'codigo_int',
     'marca', 'modelo', 'serie','cant_stock','costo_uni','venta_cant','venta_uni'];
     dataSource = new MatTableDataSource<stockList>(DATA);
     selection = new SelectionModel<stockList>(true, []);
   
  
     constructor(
      private excelService: ExcelService
      ) {}
  
    ngOnInit() {
      this.dataSource.sort = this.sort;
    }
  
   
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
    checkboxLabel(row?: stockList): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }
  
  }
  