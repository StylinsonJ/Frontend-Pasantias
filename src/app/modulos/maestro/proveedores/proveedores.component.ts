import { Component, ViewChild, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel} from '@angular/cdk/collections';

import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ProveeedorComponent } from './proveeedor/proveeedor.component';
import { ProveedoresService } from '../../../services/maestro/proveedores.service';

export interface ProveedoresList {
  id: number;
  ruc_dni: number;
  razon_name: string;
}

const DATA: ProveedoresList[] = [
  {id: 1, ruc_dni: 12345678901, razon_name: 'ABC'},
  {id: 2, ruc_dni: 88888888, razon_name: 'DEF'},
  {id: 3, ruc_dni: 11111111111, razon_name: 'GHI'},
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

  constructor(
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  //CABECERA
  displayedColumns: string[] = ['select','id', 'ruc_dni', 'razon_name'];
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
}
