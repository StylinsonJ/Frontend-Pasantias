import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface ORGA {
  unidad: string;
  area: string;
}

/** Constants used to fill up our data base. */
const COLORS: ORGA[] = [
    {unidad: 'uni1', area:'area1'},
    {unidad: 'uni1', area:''}
  ];


@Component({
  selector: 'app-consulta-org',
  templateUrl: './consulta-org.component.html',
  styleUrls: ['./consulta-org.component.css']
})

export class ConsultaOrgComponent implements AfterViewInit  {

  unidad!: string;
  area!: string;

  displayedColumns: string[] = ['unidad', 'area','actions'];
  dataSource = new MatTableDataSource<ORGA>(COLORS);

   //PAGINATOR
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;

  constructor() {
   
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
