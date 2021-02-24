import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import Ubigeo, { District, Region, Province } from "ubigeos";
//COMPONENTES
import { Proveedor } from 'src/app/componentes/maestro/proveedor';
import { Direccion } from 'src/app/componentes/maestro/direccion';
import { PersonaContacto } from 'src/app/componentes/maestro/persona-contacto';
import { CuentaBancaria } from 'src/app/componentes/maestro/cuenta-bancaria';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private urlEndPoint: string = 'http://localhost:8082/api/proveedores';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(
    private http: HttpClient, 
    private router: Router) { }

  getId(): Observable<number> {
    return this.http.get(`${this.urlEndPoint}/id`).pipe(
      map((response: any) => response.identificador as number)
    );
  }

  //API get() Proveedor ID
  getProveedor(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.urlEndPoint}/${id}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );  
  }

  //API get() Proveedores List
  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.urlEndPoint)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //API post() Create Proveedores 
  create(proveedor: Proveedor, personaContacto: PersonaContacto[], cuentaBancaria: CuentaBancaria[], direccion: Direccion[]): Observable<any> {
    
    for(let i=0; i<direccion.length; i++) {
        if(direccion[i].pais === "Perú") {
            direccion[i].departamento = Region.instance(direccion[i].departamento).getName();
            direccion[i].provincia = Province.instance(direccion[i].provincia).getName();
            direccion[i].ubigeo = District.instance(direccion[i].distrito).getCode();
            direccion[i].distrito = District.instance(direccion[i].distrito).getName();
        }
    }

    return this.http.post(this.urlEndPoint, {proveedor, personaContacto, cuentaBancaria, direccion}, {headers: this.httpHeaders})
    .pipe(
      map( (response: any) => response.proveedor as Proveedor),
      retry(1),
      catchError(this.handleError)
    );
  }

  //API put() Update Proveedores
  update(proveedor: Proveedor): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${proveedor.id}`, proveedor, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Proveedor> {
    return this.http.delete<Proveedor>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  

}
