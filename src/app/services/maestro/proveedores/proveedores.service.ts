import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Proveedor } from 'src/app/componentes/maestro/proveedor';
import { PeriodicElement } from '../../../intefaces/maestro/proveedores.interfaces';
import Ubigeo, { District, Region, Province } from "ubigeos";
import { PersonaContacto } from 'src/app/componentes/maestro/persona-contacto';
import { CuentaBancaria } from 'src/app/componentes/maestro/cuenta-bancaria';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private urlEndPoint: string = 'http://localhost:8082/api/proveedores';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  private ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'Jassyra', weight: 6, symbol: 'Ja'},
  ];

  getElementData(): PeriodicElement[]{
    return this.ELEMENT_DATA;
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(9)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false
    });
  }

  getProveedores(): Observable<Proveedor[]> {
    // return of(CLIENTES);
    return this.http.get<Proveedor[]>(this.urlEndPoint);
  }

  getId(): Observable<number> {
    return this.http.get(`${this.urlEndPoint}/id`).pipe(
      map((response: any) => response.identificador as number)
    );
  }

  create(proveedor: Proveedor, personaContacto: PersonaContacto, cuentaBancaria: CuentaBancaria): Observable<any> {
    proveedor.departamento = Region.instance(proveedor.departamento).getName();
    proveedor.provincia = Province.instance(proveedor.provincia).getName();
    proveedor.ubigeo = District.instance(proveedor.distrito).getCode();
    proveedor.distrito = District.instance(proveedor.distrito).getName();

    proveedor.departamentoDos = Region.instance(proveedor.departamentoDos).getName();
    proveedor.provinciaDos = Province.instance(proveedor.provinciaDos).getName();
    proveedor.ubigeoDos = District.instance(proveedor.distritoDos).getCode();
    proveedor.distritoDos = District.instance(proveedor.distritoDos).getName();
    return this.http.post(this.urlEndPoint, {proveedor, personaContacto, cuentaBancaria}, {headers: this.httpHeaders}).pipe(
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
