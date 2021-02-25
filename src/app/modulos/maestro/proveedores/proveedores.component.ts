import { Component, ViewChild, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel} from '@angular/cdk/collections';

import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExcelService} from '../../../services/excel/excel.service';

import { ProveeedorComponent } from './proveeedor/proveeedor.component';
import { ProveedoresService } from '../../../services/maestro/proveedores.service';
import { ProveedorDataSource } from './proveedor.datasource';
import { tap } from 'rxjs/operators';

export interface ProveedoresList {
  id: number;
  rucDni: number;
  razonSocial: string;
}

const DATA: ProveedoresList[] = [
  {id: 1, rucDni: 12345678901, razonSocial: 'ABC'},

];

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})

export class ProveedoresComponent implements OnInit  {

  id!: number;
  ruc_dni!: number;
  razon_name!: string;
  proveedorDataSource!: ProveedorDataSource;

  constructor(
    private excelService: ExcelService,
    private proveedorService: ProveedoresService,
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.proveedorDataSource = new ProveedorDataSource(this.proveedorService);
    this.proveedorDataSource.loadProveedores();
    this.dataSource.sort = this.sort;
  }

  //CABECERA
  displayedColumns: string[] = ['select','id', 'rucDni', 'razonSocial'];
  dataSource = new MatTableDataSource<ProveedoresList>(DATA);
  selection = new SelectionModel<ProveedoresList>(true, []);

  
  //FILTRO
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //PAGINATOR
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {

    this.proveedorDataSource.counter$
        .pipe(
          tap((count) => {
            this.paginator.length = count;
          })
        )
        .subscribe();
    
    this.paginator.page
      .pipe(
        tap(() => this.loadProveedores())
      )
      .subscribe();

    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  loadProveedores() {
    this.proveedorDataSource.loadProveedores(this.paginator.pageIndex, this.paginator.pageSize);
  }

   //REGISTRO-PROVEEDOR ABRIR DIALOGO
   openDialog(): void {
     
    const dialogRef = this.dialog.open(ProveeedorComponent, {
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
  checkboxLabel(row?: ProveedoresList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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
}