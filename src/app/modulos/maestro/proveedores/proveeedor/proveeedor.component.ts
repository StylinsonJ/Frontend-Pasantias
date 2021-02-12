import {  Component,NgModule, ElementRef,Inject,Injectable,Input,OnDestroy,OnInit,Optional,Self,ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Cuenta } from '../../../../intefaces/maestro/cuentas_bancarias.interface';
import {FormControl, FormGroup, NgControl,Validators,  AbstractControl, ControlValueAccessor, FormBuilder, FormsModule} from '@angular/forms';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import { MatTable } from '@angular/material/table';
import {MatAccordion} from '@angular/material/expansion';
import Ubigeo, { District, Region, Province } from "ubigeos";
import { Proveedor } from 'src/app/componentes/maestro/proveedor';
import { PersonaContacto } from 'src/app/componentes/maestro/persona-contacto';
import { CuentaBancaria } from 'src/app/componentes/maestro/cuenta-bancaria';
import { ProveedoresService } from 'src/app/services/maestro/proveedores/proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export interface ProveedoresList {
  id: number;
  ruc_dni: number;
  razon_name: string;
};


@Component({
  selector: 'app-proveeedor',
  templateUrl: './proveeedor.component.html',
  styleUrls: ['./proveeedor.component.css']
})


export class ProveeedorComponent implements OnInit {
  public region: Region[] = [];
  public provincias!: Province[] | null;
  public distritos!: District[] | null;
  public ubigeo:string | null = "";
  public region2: Region[] = [];
  public provincias2!: Province[] | null;
  public distritos2!: District[] | null;
  public ubigeo2:string | null = "";

  // Clases
  public proveedorNuevo: Proveedor = new Proveedor();
  // public personaContacto: PersonaContacto[] = [];
  public personaContacto: PersonaContacto = new PersonaContacto();
  public cuentaBancaria: CuentaBancaria = new CuentaBancaria();

  //data se lleva ProveedoresComponents
  constructor(
    private elementRef: ElementRef,
    private proveedorService: ProveedoresService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<ProveeedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProveedoresList) {
      
    }
    
    //cuenta_bancaria
    ngOnInit(): void{
      this.deleteCuenta(1);

      this.proveedorService.getId().subscribe(
        identificador => 
            this.proveedorNuevo.codigo = identificador+1 < 10 ? "PR000"+(identificador+1) :
            identificador+1 < 100 ? "PR00"+(identificador+1) : 
            identificador+1 < 1000 ? "PR0"+(identificador+1) : 
            (identificador+1).toString() 
      );

      // this.personaContacto[0] = new PersonaContacto();
      // Para las regiones
      for (let i=1; i<=25; i++) {
        if(i<10) {
          this.region[i] = Region.instance(`0${i}`);
          this.region2[i] = Region.instance(`0${i}`);
        }else {
          this.region[i] = Region.instance(`${i}`);
          this.region2[i] = Region.instance(`${i}`);
        }
      }
      this.region = this.region.filter(reg => reg != null);
      this.region2 = this.region2.filter(reg => reg != null);
    }

    onSelect(id:string):void {
      if(id) {
        this.provincias = Region.instance(id).getProvincies().filter(provincia => provincia != null);
        this.proveedorNuevo.provincia = "";
        this.proveedorNuevo.distrito = "";
        this.distritos = null;
        this.ubigeo = null;
      }
    }

    filtroProvincia(id:string):void {
      if(id) {
        this.distritos = Province.instance(id).getDistricts().filter(distrito => distrito != null);
        this.proveedorNuevo.distrito = "";
        this.ubigeo = null
      }
    }

    obtenerUbigeo(id:string):void {
      this.ubigeo = id;
    }

    onSelect2(id:string):void {
      if(id) {
        this.provincias2 = Region.instance(id).getProvincies().filter(provincia => provincia != null);
        this.proveedorNuevo.provinciaDos = "";
        this.proveedorNuevo.distritoDos = "";
        this.distritos2 = null;
        this.ubigeo2 = null;
      }
    }

    filtroProvincia2(id:string):void {
      if(id) {
        this.distritos2 = Province.instance(id).getDistricts().filter(distrito => distrito != null);
        this.proveedorNuevo.distritoDos = "";
        this.ubigeo2 = null
      }
    }

    obtenerUbigeo2(id:string):void {
      this.ubigeo2 = id;
    }

    
    cargarProveedor(): void {
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id) {
          this.proveedorService.getProveedor(id).subscribe(
            (proveedorNuevo) => this.proveedorNuevo = proveedorNuevo
          )
        }
      })
    }
  
    public create():void{
      this.proveedorService.create(this.proveedorNuevo, this.personaContacto, this.cuentaBancaria).subscribe(
        proveedor => { 
          this.onClose();
          // this.router.navigate(['/maestro'])
          // swal('Nuevo Cliente', `El cliente ${proveedor.nombre} ha sido creado con éxito`, 'success')
        }
      )
    }
  
    updated(): void {
      this.proveedorService.update(this.proveedorNuevo).subscribe(
        json => {
          this.router.navigate(['/maestro'])
          // swal('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
        })
    }  

    id = 1;

    
    CUENTAS = [ new Cuenta(this.id, '', 0 , 0, '','')];
    
    isUpdate = null;
    addCuenta(Entity:any){
      if(this.isUpdate != null){
        this.update(this.TempEdit, Entity)
      }else{
        this.id +=1;
        const cuentaEntry = new Cuenta(Entity.id, Entity.entidad, Entity.nro_cuenta, Entity.CCI, Entity.tipo_cuenta, Entity.moneda);
        this.CUENTAS.push(cuentaEntry);
        this.resetCuenta(Entity);
      }
    }
    
    
    TempEdit = null;
    update(Model:any, Entity:any){
      for(let i = 0; i < this.CUENTAS.length; ++i){
        if (this.CUENTAS[i].id === Model.id){
          Entity.CUENTAS[i].entidad = Entity.entidad;
          Entity.CUENTAS[i].nro_cuenta = Entity.nro_cuenta;
          Entity.CUENTAS[i].CCI = Entity.CCI;
          Entity.CUENTAS[i].tipo_cuenta = Entity.tipo_cuenta;
          Entity.CUENTAS[i].moneda = Entity.moneda;
        }
      }
      
      this.resetCuenta(Entity);
      this.isUpdate = null;
    }
      deleteCuenta(id:any){
        for(let i=0; i < this.CUENTAS.length; ++i){
          if(this.CUENTAS[i].id === id){
            this.CUENTAS.splice(i,1);
          }
        }
      }
      
      EditCuenta(Entity:any, Model:any){
        Model.entidad = Entity.entidad;
        Model.nro_cuenta = Entity.nro_cuenta;
        Model.CCI = Entity.CCI;
        Model.tipo_cuenta = Entity.tipo_cuenta;
        Model.moneda = Entity.moneda;
      }

      resetCuenta(Entity :any){
        Entity.entidad = '';
        Entity.nro_cuenta = 0;
        Entity.CCI = 0;
        Entity.tipo_cuenta = '';
        Entity.moneda = '';
      }
    
    


    //CHECK RADIO
  onClose(): void {
    this.dialogRef.close();
  }

  impuestosAsociados!: string;
  impuestos: string[] = ['IGV', 'ISC', 'Servicios', 'Otros'];

  tiposPagos!: string;
  pagos: string[] = ['Tarjeta de Crédito', 'Transferencia', 'Efectivo', 'Cheque','Otros'];

  //EXPANSION DE DIRECCION Y DATOS PERSONALES
  panelOpenState = false;

//EMAIL
email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
