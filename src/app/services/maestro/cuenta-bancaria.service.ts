import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CuentaBancaria } from 'src/app/componentes/maestro/cuenta-bancaria';

@Injectable({
  providedIn: 'root'
})
export class CuentaBancariaService {

  private urlEndPoint: string = 'http://localhost:8082/api/cuentas-bancarias';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getCuentas(): Observable<CuentaBancaria[]> {
    return this.http.get<CuentaBancaria[]>(this.urlEndPoint);
  }

  create(cuentaBancaria: CuentaBancaria): Observable<CuentaBancaria> {
    return this.http.post(this.urlEndPoint, cuentaBancaria, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.cuentaBancaria as CuentaBancaria)
    );
  }

  getCuenta(id: number): Observable<CuentaBancaria> {
    return this.http.get<CuentaBancaria>(`${this.urlEndPoint}/${id}`);
  }

  update(cuentaBancaria: CuentaBancaria): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cuentaBancaria.id}`, cuentaBancaria, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<CuentaBancaria> {
    return this.http.delete<CuentaBancaria>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
