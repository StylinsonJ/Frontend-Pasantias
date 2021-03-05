import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BehaviorSubject, merge, Observable, of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { Cliente } from "src/app/componentes/maestro/cliente";
import { ClientesService } from "src/app/services/maestro/clientes.service";

export class ClienteDataSource extends DataSource<Cliente> {
    _filterChange = new BehaviorSubject('');

    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    filteredData: Cliente[] = [];
    renderedData: Cliente[] = [];

    constructor(public _clienteService: ClientesService,
                public _paginator: MatPaginator,
                public _sort: MatSort) {
        super();
        // Reset to the first page when the user changes the filter.
        this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Cliente[]> {
        // Listen for any changes in the base data, sorting, filtering, or pagination
        const displayDataChanges = [
            this._clienteService.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page
        ];

        this._clienteService.getAll();


        return merge(...displayDataChanges).pipe(map( () => {
                // Filter data
                this.filteredData = this._clienteService.data.slice().filter((cliente: Cliente) => {
                    const searchStr = (cliente.codigo! + cliente.rucDni! + cliente.razonSocial!).toLowerCase();
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
    sortData(data: Cliente[]): Cliente[] {
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
        let propertyA: number | string | undefined = '';
        let propertyB: number | string | undefined = '';

        switch (this._sort.active) {
            case 'codigo': [propertyA, propertyB] = [a.codigo, b.codigo]; break;
            case 'rucDni': [propertyA, propertyB] = [a.rucDni, b.rucDni]; break;
            case 'razonSocial': [propertyA, propertyB] = [a.razonSocial, b.razonSocial]; break;
        }

        const valueA = isNaN(+!propertyA) ? propertyA : +!propertyA;
        const valueB = isNaN(+!propertyB) ? propertyB : +!propertyB;

        return (valueA! < valueB! ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }
}