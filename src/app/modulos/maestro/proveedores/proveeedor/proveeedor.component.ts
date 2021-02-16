import { Component,OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { Cuenta } from '../../../../intefaces/maestro/cuentas_bancarias.interface';
import { FormControl,Validators} from '@angular/forms';
import { District, Region, Province } from "ubigeos";
import { ActivatedRoute, Router } from '@angular/router';
//COMPONENTE
import { Direccion } from 'src/app/componentes/maestro/direccion'; 
import { Proveedor } from 'src/app/componentes/maestro/proveedor';
import { PersonaContacto } from 'src/app/componentes/maestro/persona-contacto';
import { CuentaBancaria } from 'src/app/componentes/maestro/cuenta-bancaria';
//SERVICE
import { ProveedoresService } from 'src/app/services/maestro/proveedores.service';

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

  // Clases
  public proveedorNuevo: Proveedor = new Proveedor();
  // public personaContacto: PersonaContacto[] = [];
  public personaContacto: PersonaContacto = new PersonaContacto();
  public cuentaBancaria: CuentaBancaria = new CuentaBancaria();
  public direccion: Direccion = new Direccion(0,'', '', '','','','',0);

  //data se lleva ProveedoresComponents
  constructor(
    private proveedorService: ProveedoresService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<ProveeedorComponent>) {
      
    }
    
    //cuenta_bancaria
    ngOnInit(): void{
      this.deleteCuenta(1);
    //-----------------------
      this.proveedorService.getId().subscribe(
        identificador => 
            this.proveedorNuevo.codigo = identificador+1 < 10 ? "PR000"+(identificador+1) :
            identificador+1 < 100 ? "PR00"+(identificador+1) : 
            identificador+1 < 1000 ? "PR0"+(identificador+1) : 
            identificador.toString() 
      );

      // this.personaContacto[0] = new PersonaContacto();
      // Para las regiones
      for (let i=1; i<=25; i++) {
        if(i<10) {
          this.region[i] = Region.instance(`0${i}`);
        }else {
          this.region[i] = Region.instance(`${i}`);
        }
      }
      this.region = this.region.filter(reg => reg != null);
    }

    onSelect(id:string):void {
      if(id) {
        this.provincias = Region.instance(id).getProvincies().filter(provincia => provincia != null);
        this.direccion.provincia = "";
        this.direccion.distrito = "";
        this.distritos = null;
        this.ubigeo = null;
      }
    }

    filtroProvincia(id:string):void {
      if(id) {
        this.distritos = Province.instance(id).getDistricts().filter(distrito => distrito != null);
        this.direccion.distrito = "";
        this.ubigeo = null
      }
    }

    obtenerUbigeo(id:string):void {
      this.ubigeo = id;
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
      this.proveedorService.create(this.proveedorNuevo, this.personaContacto, this.cuentaBancaria, this.direccion).subscribe(
        proveedor => { 
          // this.router.navigate(['/maestro'])
          this.onClose();
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
    
    onClose(): void {
      this.dialogRef.close();
    }
  

    //CUENTA BANCARIA
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
        if (this.CUENTAS[i].id === Model.id ){
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
