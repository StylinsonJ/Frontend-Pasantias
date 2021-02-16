import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Ubigeo, { District, Region, Province } from "ubigeos";
//COMPONENTES
import { Cliente } from 'src/app/componentes/maestro/cliente';
import { PersonaContacto } from 'src/app/componentes/maestro/persona-contacto';
import { Direccion } from 'src/app/componentes/maestro/direccion';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private urlEndPoint = 'http://localhost:8082/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(
    private http: HttpClient
    ) { }

  getAll(): Observable<Cliente[]> {
    // return of(CLIENTES);
    return this.http.get<Cliente[]>(`${this.urlEndPoint}`);
  }

  getId(): Observable<number> {
    return this.http.get(`${this.urlEndPoint}/id`).pipe(
      map((response: any) => response.identificador as number)
    );
  }
  
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  saveCliente(cliente: Cliente, personaContacto: PersonaContacto, direccion: Direccion): Observable<any> {
    direccion.departamento = Region.instance(direccion.departamento).getName();
    direccion.provincia = Province.instance(direccion.provincia).getName();
    direccion.ubigeo = District.instance(direccion.distrito).getCode();
    direccion.distrito = District.instance(direccion.distrito).getName();
    return this.http.post(this.urlEndPoint, {cliente, personaContacto, direccion}, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.cliente as Cliente)
    );
  }

  updateCliente(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

  deleteCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }

  deleteAll(): Observable<Cliente[]> {
    return this.http.delete<Cliente[]>(this.urlEndPoint)
  }
}
