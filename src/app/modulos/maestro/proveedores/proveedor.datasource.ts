import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { Proveedor, ProveedorListResponse } from "src/app/componentes/maestro/proveedor";
import { ProveedoresService } from "src/app/services/maestro/proveedores.service";

export class ProveedorDataSource implements DataSource<Proveedor> {
    private proveedorSubject = new BehaviorSubject<Proveedor[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    constructor(private proveedorService: ProveedoresService) { }

    connect(collectionViewer: CollectionViewer): Observable<Proveedor[]> {
        return this.proveedorSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.proveedorSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadProveedores(pageNumber = 0, pageSize = 10) {
        this.loadingSubject.next(true);
        this.proveedorService.getProveedores({ page: pageNumber, size: pageSize })
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((result: ProveedorListResponse | any) => {
                this.proveedorSubject.next(result.content);
                this.countSubject.next(result.totalElements);
            }
            );
    }
}