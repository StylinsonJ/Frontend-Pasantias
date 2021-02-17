import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { DetalleComponent } from './detalle/detalle.component';

import {SelectionModel} from '@angular/cdk/collections';

export interface productoList {
  id: number;
  producto: string;
  descripcion: string;
  val_uni: number;
  cantidad: number;
  accion: string;
  accion2: string;
}

const DATA: productoList[] = [
  {id:1, producto: 'telefono', descripcion: 'android', val_uni: 700, cantidad:100, accion:"",accion2:"" },
  {id:2, producto: 'laptop',   descripcion: 'de japon', val_uni: 500, cantidad:100, accion:"",accion2:""},
];

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  id!: number;
  producto!: string;
  descripcion!: string;
  val_uni!: number;
  cantidad!: number;
  accion!: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  //CABECERA
  displayedColumns: string[] = [ 'id', 'producto', 'descripcion', 'val_uni', 'cantidad', 'accion','accion2'];
  dataSource = new MatTableDataSource<productoList>(DATA);
  selection = new SelectionModel<productoList>(true, []);

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
//CONTACTO-ABRIR DIALOGO
openDialog():void {
  const dialogRef = this.dialog.open(DetalleComponent, {
    width: '80%',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
}
