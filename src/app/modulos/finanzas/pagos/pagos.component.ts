import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort } from '@angular/material/sort';

import { ExcelService} from '../../../services/excel/excel.service';

import {SelectionModel} from '@angular/cdk/collections';
import { FacturaGtComponent } from './factura-gt/factura-gt.component';


export interface PagosList {
  id: number;
  registro: string;
  ruc_dni: number;
  razon_name: string;
  fec_emi: string;
  fec_ven: string;
  estado: string;
  importe_tot: number;
  
}

const DATA: PagosList[] = [
  {id: 1, registro: 'RC001', ruc_dni: 12345678901, razon_name: 'ABC', fec_emi: '01/01/2021', fec_ven: '14/02/2021', estado: 'pendiente', importe_tot:1500},
  {id: 2, registro: 'GT001', ruc_dni: 88888888,    razon_name: 'DEF', fec_emi: '16/04/2019', fec_ven: '26/02/2021', estado: 'pendiente', importe_tot:2800},
  {id: 3, registro: 'TC001', ruc_dni: 11111111111, razon_name: 'GHI', fec_emi: '01/03/2018', fec_ven: '03/02/2021', estado: 'pendiente', importe_tot:3000},
];

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  id!: number;
  registro!: string;
  ruc_dni!: number;
  razon_name!: string;
  fec_emi!: string;
  fec_ven!: string;
  estado!: string;
  imp_total!: number;

   //CABECERA
   displayedColumns: string[] = ['select', 'registro', 'fec_emi', 'fec_ven','ruc_dni', 'razon_name','tipo_com', 'num_serie' ,'num_comprobante','estado', 'moneda','imp_total','action'];
   dataSource = new MatTableDataSource<PagosList>(DATA);
   selection = new SelectionModel<PagosList>(true, []);

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


  constructor(
    public dialog: MatDialog,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
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
  checkboxLabel(row?: PagosList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

   //REGISTRO-PROVEEDOR ABRIR DIALOGO
   openDialog(): void {
     
    const dialogRef = this.dialog.open(FacturaGtComponent, {
      width: '100%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo cerrado');
    });
  }


}
