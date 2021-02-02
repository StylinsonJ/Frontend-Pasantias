import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gasto } from './gasto';
import { Tipo_Gasto, Concepto } from '../../../intefaces/gastos.interface';

@Injectable({
  providedIn: 'root'
})

export class GastosService {

  private urlEndPoint: string = 'http://localhost:8082/api/gastos';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getGastos(): Observable<Gasto[]> {
    // return of(CLIENTES);
    return this.http.get<Gasto[]>(this.urlEndPoint);
  }

  create(gastos: Gasto): Observable<Gasto> {
    return this.http.post<Gasto>(this.urlEndPoint, gastos, {headers: this.httpHeaders});
  }

  getGasto(id: number): Observable<Gasto> {
    return this.http.get<Gasto>(`${this.urlEndPoint}/${id}`)
  }

  update(gasto: Gasto): Observable<Gasto> {
    return this.http.put<Gasto>(`${this.urlEndPoint}/${gasto.id}`, gasto, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Gasto> {
    return this.http.delete<Gasto>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }
  
  private types: Tipo_Gasto[] = [
    {
      id:1,
      name: 'Ventas'
    },
    {
      id:2,
      name: 'Administracion' 
    },
    {
      id:3,
      name: 'Comun' 
    }
  ];

  private conceptos: Concepto[]=[
    {id:1,idGasto:1,name: 'Logistica'},
    {id:2,idGasto:1,name: 'Publicidad'},
    {id:3,idGasto:1,name: 'Otros'},

    {id:4,idGasto:2,name: 'Multas'},
    {id:5,idGasto:2,name: 'Tributos'},
    {id:6,idGasto:2,name: 'Licencias'},
    {id:7,idGasto:2,name: 'Cobranzas'},
    {id:9,idGasto:2,name: 'Otros'},
    
    {id:10,idGasto:3,name: 'Alquiler'},
    {id:11,idGasto:3,name: 'Seguros'},
    {id:12,idGasto:3,name: 'Depresiacion'},
    {id:13,idGasto:3,name: 'Servicios Publicos'},
    {id:14,idGasto:3,name: 'Combustibles'},
    {id:15,idGasto:3,name: 'Suministro'},
    {id:16,idGasto:3,name: 'Alimentacion'},
    {id:17,idGasto:3,name: 'Otros'},

  ];

  getTypes(): Tipo_Gasto[]{
    return this.types;
  }

  getConceptos(): Concepto[]{
    return this.conceptos;
  }
}
