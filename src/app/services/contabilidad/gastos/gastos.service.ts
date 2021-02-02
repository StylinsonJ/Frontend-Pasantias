import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gasto } from './gasto';

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
}
