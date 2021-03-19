import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort } from '@angular/material/sort';
import { MatDialog} from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import { ExcelService} from '../../../services/excel/excel.service';
import { BancoComponent } from './banco/banco.component';
import {fromEvent} from 'rxjs';
import { BancosMaestroService } from 'src/app/services/maestro/bancos-maestro.service';
import { Banco } from 'src/app/intefaces/maestro/bancos.interface';
import { HttpClient } from '@angular/common/http';
import { BancoDataSource } from './banco.datasource';
const DATA: Banco[] = [
  // {id: 1, entidad: "BCP", nro_cuenta: 16166267199199 ,CCI: 986234567899567,
  // tipo_cuenta: 'trabajo', moneda: "dolar"},
  // {id: 2, entidad: "BBVA", nro_cuenta: 3344299393333 ,CCI: 239293233333332,
  // tipo_cuenta: 'credito', moneda: "soles"},
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
  moneda!: string;
  bancoDatabase!: BancosMaestroService | null;
  bancoDataSource!: BancoDataSource;

  constructor(
    public httpClient: HttpClient,
    private excelService: ExcelService,
    public dialog: MatDialog,
    public dataService: BancosMaestroService
    ) {}

  //PAGINATOR
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('filter',  {static: true}) filter!: ElementRef;

  ngOnInit() {
    this.loadData();
    // this.dataSource.sort = this.sort;
  }

  refresh() {
    this.loadData();
  }

  //CABECERA
  displayedColumns: string[] = ['select', 'entidad', 'nro_cuenta','CCI','tipo_cuenta', 'moneda', 'actions'];
  dataSource = new MatTableDataSource<Banco>(DATA);
  selection = new SelectionModel<Banco>(true, []);

  //EXPORTAR A EXCEL 
  exportAsXLSX():void{
    // this.excelService.exportToExcel(this.bancoDataSource.data , 'my_export');
  }

  exportAsCSVFiltro():void{
    this.excelService.exportToExcel(this.bancoDataSource.filteredData , 'my_export');
  }

  exportAsExcelCheck():void{
    this.excelService.exportToExcel(this.selection.selected , 'my_export');
  }

  //FILTRO
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.bancoDataSource.filter = filterValue.trim().toLowerCase();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  //REGISTRO-PROVEEDOR ABRIR DIALOGO
  openDialog(): void {
     
    const dialogRef = this.dialog.open(BancoComponent, {
      width: '50%',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) {
        this.bancoDatabase?.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
        console.log('The dialog was closed');
      }
    });
  }

  startEdit(id:number) {
    this.id = id;
    const dialogRef = this.dialog.open(BancoComponent, {
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.bancoDatabase?.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.bancoDatabase!.dataChange.value[foundIndex!] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id:number, entidad:string, moneda: string, tipoCuenta: string, fechaApertura: Date, numCuenta: string, cci: string, funcionario: string, agApertura: string, estado: string, comentarios: string) {
    this.id = id;
    const dialogRef = this.dialog.open(BancoComponent, {
      data: {id: id, 
          entidad: entidad, 
          moneda: moneda, 
          tipoCuenta: tipoCuenta, 
          fechaApertura: fechaApertura, 
          numCuenta: numCuenta, 
          cci: cci, 
          funcionario: funcionario,
          agApertura: agApertura,
          estado: estado,
          comentarios: comentarios}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.bancoDatabase?.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.bancoDatabase?.dataChange.value.splice(foundIndex!, 1);
        this.refreshTable();
      }
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

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.bancoDatabase = new BancosMaestroService(this.httpClient);
    this.bancoDataSource = new BancoDataSource(this.bancoDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.bancoDataSource) {
          return;
        }
        this.bancoDataSource.filter = this.filter.nativeElement.value;
      });
  }

}