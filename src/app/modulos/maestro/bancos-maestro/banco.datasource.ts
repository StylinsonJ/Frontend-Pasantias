import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Banco } from "src/app/intefaces/maestro/bancos.interface";
import { BancosMaestroService } from "src/app/services/maestro/bancos-maestro.service";

export class BancoDataSource extends DataSource<Banco> {
    _filterChange = new BehaviorSubject('');
  
    get filter(): string {
      return this._filterChange.value;
    }
  
    set filter(filter: string) {
      this._filterChange.next(filter);
    }
  
    filteredData: Banco[] = [];
    renderedData: Banco[] = [];
  
    constructor(public _bancoDatabase: BancosMaestroService,
                public _paginator: MatPaginator,
                public _sort: MatSort) {
      super();
      // Reset to the first page when the user changes the filter.
      this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }
  
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Banco[]> {
      // Listen for any changes in the base data, sorting, filtering, or pagination
      const displayDataChanges = [
        this._bancoDatabase.dataChange,
        this._sort.sortChange,
        this._filterChange,
        this._paginator.page
      ];
  
      this._bancoDatabase.getAllBancos();
  
  
      return merge(...displayDataChanges).pipe(map( () => {
          // Filter data
          this.filteredData = this._bancoDatabase.data.slice().filter((banco: Banco) => {
            const searchStr = (banco.entidad + banco.numCuenta + banco.cci + banco.tipoCuenta + banco.moneda).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
  
          // Sort filtered data
          const sortedData = this.sortData(this.filteredData.slice());
  
          // Grab the page's slice of the filtered sorted data.
          const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
          this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
          return this.renderedData;
        }
      ));
    }
  
    disconnect() {}
  
  
    /** Returns a sorted copy of the database data. */
    sortData(data: Banco[]): Banco[] {
      if (!this._sort.active || this._sort.direction === '') {
        return data;
      }
  
      return data.sort((a, b) => {
        let propertyA: number | string = '';
        let propertyB: number | string = '';
  
        switch (this._sort.active) {
          case 'entidad': [propertyA, propertyB] = [a.entidad, b.entidad]; break;
          case 'numCuenta': [propertyA, propertyB] = [a.numCuenta, b.numCuenta]; break;
          case 'cci': [propertyA, propertyB] = [a.cci, b.cci]; break;
          case 'tipoCuenta': [propertyA, propertyB] = [a.tipoCuenta, b.tipoCuenta]; break;
          case 'moneda': [propertyA, propertyB] = [a.moneda, b.moneda]; break;
        }
  
        const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  
        return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  