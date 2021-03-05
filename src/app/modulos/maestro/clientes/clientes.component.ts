import { Component,ViewChild, OnInit, ElementRef } from '@angular/core';
import { SelectionModel} from '@angular/cdk/collections';

import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ClienteComponent } from './cliente/cliente.component';
import { ClientesService } from '../../../services/maestro/clientes.service';
import { HttpClient } from '@angular/common/http';
import { ClienteDataSource } from './cliente.datasource';
import { fromEvent } from 'rxjs';
import { Cliente } from 'src/app/componentes/maestro/cliente';
import { DeleteComponent } from './delete/delete.component';

export interface ClientesList {
  id: number;
  ruc_dni: number;
  razon_name: string;
}

const DATA: ClientesList[] = [
  {id: 1, ruc_dni: 12345678901, razon_name: 'ABC'},
  {id: 2, ruc_dni: 88888888, razon_name: 'DEF'},
  {id: 3, ruc_dni: 11111111111, razon_name: 'GHI'},
];

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
 
  id!: number;
  ruc_dni!: number;
  razon_name!: string;
  clienteDataSource!: ClienteDataSource;
  clienteService!: ClientesService | null;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService: ClientesService
    ) {}
  
  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  //CABECERA
  displayedColumns: string[] = ['select','codigo', 'rucDni', 'razonSocial','actions'];
  dataSource = new MatTableDataSource<ClientesList>(DATA);
  selection = new SelectionModel<ClientesList>(true, []);

  
  //FILTRO
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  //PAGINATOR
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('filter',  {static: true}) filter!: ElementRef;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  //REGISTRO-PROVEEDOR ABRIR DIALOGO
  openDialog(): void {
     
    const dialogRef = this.dialog.open(ClienteComponent, {
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) {
        console.log('The dialog was closed');
        this.clienteService?.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  //CREAR

  //EDITAR
  startEdit(id:number) {
    this.id = id;
    const dialogRef = this.dialog.open(ClienteComponent,  {
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) {
        const foundIndex = this.clienteService?.dataChange.value.findIndex(x => x.id === this.id); 
        this.clienteService!.dataChange.value[foundIndex!] = this.dataService.getDialogData();
        this.refreshTable();
      }
    });
  }

  //ELIMINAR
  deleteItem(i:number, id:number, codigo: string, rucDni: string, razonSocial: string) {
    this.id = id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id: id, codigo: codigo, rucDni: rucDni, razonSocial: razonSocial}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) {
        const foundIndex = this.clienteService?.dataChange.value.findIndex(x => x.id === this.id);
        this.clienteService?.dataChange.value.splice(foundIndex!, 1);
        this.refreshTable();
      }
    })
  }
  
  //CARGAR CLIENTES
  public loadData() {
    this.clienteService = new ClientesService(this.httpClient);
    this.clienteDataSource = new ClienteDataSource(this.clienteService, this.paginator, this.sort);
    fromEvent(this.filter?.nativeElement, 'keyup')
    .subscribe(() => {
      if (!this.clienteDataSource) {
        return;
      }
      this.clienteDataSource.filter = this.filter.nativeElement.value;
    });
  }

  //REFRESCAR TABLA
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
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
  checkboxLabel(row?: ClientesList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
