import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import {ProductsService} from './products.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import { ProductoComponent } from './producto/producto.component';

export interface PRODUCTO {
  id: number;
  cod_barra: number;
  familia: string;
  subfamilia: string;
  marca: string;
  descripcion: string;
  stock: number;
}

export const DATA_PROD: PRODUCTO[] = [
  {
    id: 1,
    cod_barra: 100310103,
    familia: "Tecnologia",
    subfamilia: "Celulares",
    marca: "Xiaomi",
    descripcion: "Mi9",
    stock: 100,
  },
]

@Component({
  selector: 'app-productos',
  providers: [ProductsService, DecimalPipe],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  ngOnInit(): void {
  }

  
  countries$: Observable<PRODUCTO[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: ProductsService,
    public dialog: MatDialog,) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

   //REGISTRO-PROVEEDOR ABRIR DIALOGO
   openDialog(): void {
     
    const dialogRef = this.dialog.open(ProductoComponent, {
      width: '80%',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
