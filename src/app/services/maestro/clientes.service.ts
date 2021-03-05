import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Ubigeo, { District, Region, Province } from "ubigeos";
//COMPONENTES
import { Cliente } from 'src/app/componentes/maestro/cliente';
import { PersonaContacto } from 'src/app/componentes/maestro/persona-contacto';
import { Direccion } from 'src/app/componentes/maestro/direccion';

@Injectable()
export class ClientesService {

  private urlEndPoint = 'http://localhost:8082/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  dataChange: BehaviorSubject<Cliente[]> = new BehaviorSubject<Cliente[]>([]);
  dialogData: any;

  constructor(
    private http: HttpClient
    ) { }

  get data(): Cliente[] {
    return this.dataChange.value;
  }

  getDialogData() {
    console.log(this.dialogData);
    return this.dialogData;
  }

  getClientes(request: any): Observable<Cliente[]> {
    const params = request;
    return this.http.get<Cliente[]>(this.urlEndPoint, {params});
  }

  getAll(): void {
    // return of(CLIENTES);
    this.http.get<Cliente[]>(`${this.urlEndPoint}/all`).subscribe(data => {
      this.dataChange.next(data);
    });
  }

  getId(): Observable<number> {
    return this.http.get(`${this.urlEndPoint}/id`).pipe(
      map((response: any) => response.identificador as number)
    );
  }
  
  getCliente(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${id}`);
  }

  saveCliente(cliente: Cliente, personaContacto: PersonaContacto[], direccion: Direccion[]): void {
    
    for(let i=0; i<direccion.length; i++) {
      if(direccion[i].pais === "Perú") {
          direccion[i].ubigeo = District.instance(direccion[i].distrito).getCode();
      }
    }
    
    this.http.post(this.urlEndPoint, {cliente, personaContacto, direccion}, {headers: this.httpHeaders}).pipe(
      map( (response: any) =>  this.dialogData = response.cliente as Cliente
    ));
  }

  updateCliente(cliente: Cliente, direccion: Direccion[], personaContacto: PersonaContacto[]): Observable<any> {
    
    for(let i=0; i<direccion.length; i++) {
      if(direccion[i].pais === "Perú") {
          direccion[i].ubigeo = District.instance(direccion[i].distrito).getCode();
      }else {
        direccion[i].departamento='';
        direccion[i].provincia='';
        direccion[i].distrito='';
        direccion[i].ubigeo='';
      }
    }

    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, {cliente, direccion, personaContacto}, {headers: this.httpHeaders});
  }

  deleteCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }

  deleteAll(): Observable<Cliente[]> {
    return this.http.delete<Cliente[]>(this.urlEndPoint)
  }

  addCliente(cliente: Cliente): void {
    this.dialogData = cliente;
  }

  update(cliente: Cliente): void {
    this.dialogData = cliente;
  }
}
