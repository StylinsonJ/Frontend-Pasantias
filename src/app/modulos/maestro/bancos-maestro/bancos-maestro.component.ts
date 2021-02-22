import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort } from '@angular/material/sort';
import { MatDialog} from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import { Banco } from '../../../intefaces/maestro/cuentas_bancarias.interface'
import { ExcelService} from '../../../services/excel/excel.service';
import { BancoComponent } from './banco/banco.component';
const DATA: Banco[] = [
  {id: 1, entidad: "BCP", nro_cuenta: 16166267199199 ,CCI: 986234567899567,
  tipo_cuenta: 'trabajo', moneda: "dolar"},
  {id: 2, entidad: "BBVA", nro_cuenta: 3344299393333 ,CCI: 239293233333332,
  tipo_cuenta: 'credito', moneda: "soles"},
];

@Component({
  selector: 'app-bancos-maestro',
  templateUrl: './bancos-maestro.component.html',
  styleUrls: ['./bancos-maestro.component.css']
})
export class BancosMaestroComponent implements OnInit {
  id!:number;
  entidad!: string;
  nro_cuenta!: number;
  CCI!: number;
  tipo_cuenta!: string;
  moneda!: string

  constructor(
    private excelService: ExcelService,
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  //CABECERA
  displayedColumns: string[] = ['select', 'id', 'entidad', 'nro_cuenta','CCI','tipo_cuenta', 'moneda'];
  dataSource = new MatTableDataSource<Banco>(DATA);
  selection = new SelectionModel<Banco>(true, []);

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
  //REGISTRO-PROVEEDOR ABRIR DIALOGO
  openDialog(): void {
     
    const dialogRef = this.dialog.open(BancoComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
  checkboxLabel(row?: Banco): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


}
