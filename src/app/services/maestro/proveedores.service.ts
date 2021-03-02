import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
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
  dataChange: BehaviorSubject<Proveedor[]> = new BehaviorSubject<Proveedor[]>([]);
  dialogData: any;

  constructor(
    private http: HttpClient, 
    private router: Router) { }

  get data(): Proveedor[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getId(): Observable<number> {
    return this.http.get(`${this.urlEndPoint}/id`).pipe(
      map((response: any) => response.identificador as number)
    );
  }

  //API get() Proveedor ID
  getProveedor(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${id}`)
      // .pipe(
      //   retry(1),
      //   catchError(this.handleError)
      // );  
  }

  //API get() Proveedores List
  getProveedores(request: any): Observable<Proveedor[]> {
    const params = request;
    return this.http.get<Proveedor[]>(this.urlEndPoint, {params});
  }

  //API post() Create Proveedores 
  create(proveedor: Proveedor, personaContacto: PersonaContacto[], cuentaBancaria: CuentaBancaria[], direccion: Direccion[]): Observable<any> {
    
    for(let i=0; i<direccion.length; i++) {
        if(direccion[i].pais === "Perú") {
            direccion[i].ubigeo = District.instance(direccion[i].distrito).getCode();
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
  update(proveedor: Proveedor, personaContacto: PersonaContacto[], cuentaBancaria: CuentaBancaria[], direccion: Direccion[]): Observable<any> {
    
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
    
    return this.http.put<any>(`${this.urlEndPoint}/${proveedor.id}`, {proveedor, personaContacto, cuentaBancaria, direccion}, {headers: this.httpHeaders});
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

  /*
  form: FormGroup = new FormGroup({
    $key:             new FormControl(null),
    rucDni:           new FormControl(''),
    razonSocial:      new FormControl(''),
    fechaIni:         new FormControl(''),
    rubroActividad:   new FormControl(''),
    comentarios:      new FormControl(''),
    impuestoAsociado: new FormControl(''),
    tipoPago:         new FormControl(''),

    direccion:        new FormControl(''),
    pais:             new FormControl(''),
    departamento:     new FormControl(''),
    provincia:        new FormControl(''),
    distrito:         new FormControl(''),
    ubigeo:           new FormControl(''),

    nombre:           new FormControl(''),
    cargo:            new FormControl(''),
    telefono:         new FormControl(''),
    correo:           new FormControl(''),

    entidad:          new FormControl(''),
    numCuenta:        new FormControl(0),
    cci:              new FormControl(0),
    tipoCuenta:       new FormControl(''),
    moneda:           new FormControl(''),

  });

  initializeFormGroup() {
      this.form.setValue({
      $key:             null,
      
      rucDni:           '',
      razonSocial:      '',
      fechaIni:         '',
      rubroActividad:   '',
      comentarios:      '',
      impuestoAsociado: '',
      tipoPago:         '',

      direccion:        '',
      pais:             '',
      departamento:     '',
      provincia:        '',
      distrito:         '',
      ubigeo:           '',

      nombre:           '',
      cargo:            '',
      telefono:         '',
      correo:           '',

      entidad:          '',
      numCuenta:        0,
      cci:              0,
      tipoCuenta:       '',
      moneda:           '',
    });
  }*/  

}