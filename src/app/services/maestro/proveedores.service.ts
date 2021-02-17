import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  constructor(private http: HttpClient, private router: Router) { }

  getProveedores(): Observable<Proveedor[]> {
    // return of(CLIENTES);
    return this.http.get<Proveedor[]>(this.urlEndPoint);
  }

  getId(): Observable<number> {
    return this.http.get(`${this.urlEndPoint}/id`).pipe(
      map((response: any) => response.identificador as number)
    );
  }

  create(proveedor: Proveedor, personaContacto: PersonaContacto, cuentaBancaria: CuentaBancaria, direccion: Direccion): Observable<any> {
    direccion.departamento = Region.instance(direccion.departamento).getName();
    direccion.provincia = Province.instance(direccion.provincia).getName();
    direccion.ubigeo = District.instance(direccion.distrito).getCode();
    direccion.distrito = District.instance(direccion.distrito).getName();

    return this.http.post(this.urlEndPoint, {proveedor, personaContacto, cuentaBancaria, direccion}, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.proveedor as Proveedor)
    );
  }

  getProveedor(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.urlEndPoint}/${id}`);
  }

  update(proveedor: Proveedor): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${proveedor.id}`, proveedor, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Proveedor> {
    return this.http.delete<Proveedor>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }

}
