import { Component,Inject,OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl ,Validators} from '@angular/forms';
import { District, Region, Province } from "ubigeos";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { startWith, map} from 'rxjs/operators';

import { MatSnackBar, 
         MatSnackBarHorizontalPosition,
         MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { SaveNotifComponent} from '../../../../layouts/notificaciones/save-notif'
//COMPONENTE
import { Direccion } from 'src/app/componentes/maestro/direccion'; 
import { Proveedor } from 'src/app/componentes/maestro/proveedor';
import { PersonaContacto } from 'src/app/componentes/maestro/persona-contacto';
import { CuentaBancaria } from 'src/app/componentes/maestro/cuenta-bancaria';
//SERVICE
import { ProveedoresService } from 'src/app/services/maestro/proveedores.service';
import { CountryI } from 'src/app/intefaces/maestro/pais.interface';
import { DireccionService } from 'src/app/services/maestro/direccion.service';
//INTERFACE
import { Cuenta } from '../../../../intefaces/maestro/cuentas_bancarias.interface';
import { Direcciones } from '../../../../intefaces/maestro/direcciones.interface';
import { Contactos } from '../../../../intefaces/maestro/contactos.interfaces';
import { DataUbigeoI } from 'src/app/intefaces/maestro/data-ubigeo.interface';

@Component({
  selector: 'app-proveeedor',
  templateUrl: './proveeedor.component.html',
  styleUrls: ['./proveeedor.component.css']
})

export class ProveeedorComponent implements OnInit {
  
  //SELECT DIRECCION
  public selectedCountry: CountryI = {id: '', value: ''};
  public countries: CountryI[] = [];
  public region: Region[] = [];
  public provincias!: Province[] | null;
  public distritos!: District[] | null;
  public ubigeo:string | null = "";
  public show:boolean = false;
  public dataUbigeo: DataUbigeoI[] = [{
    country: [],
    region: [],
    provincia: null,
    distrito: null,
    ubigeo: "",
    show: false
  }];
  //CLASES
  public proveedorNuevo: Proveedor = new Proveedor();
  public personaContacto: PersonaContacto[] = [{
    cargo: "",
    clienteId: null,
    correo: "",
    id: 0,
    nombre: "",
    telefono: "",
    proveedorId: null
  }];
  public cuentaBancaria: CuentaBancaria[] = [{
    id:0,
    cci: "",
    entidad:"",
    moneda: "",
    numCuenta: "",
    tipoCuenta: "",
    proveedorId: null
  }];
  public direccion: Direccion[] = [{ 
      id:null,
      direccion:'', 
      pais:'',
      departamento:'',
      provincia:'',
      distrito:'',
      ubigeo:'',
      clienteId:null}];

  //llamar funciones
  constructor(
    private _snackBar: MatSnackBar,
    private proveedorService: ProveedoresService,
    private direccionService: DireccionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public  dialogRef: MatDialogRef<ProveeedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }
  
  //---------------------CHECK RADIO
  impuestosAsociados!: string;
  impuestos: string[] = ['IGV', 'ISC', 'Servicios', 'Otros'];

  tiposPagos!: string;
  pagos: string[] = ['Tarjeta de Crédito', 'Transferencia', 'Efectivo', 'Cheque','Otros'];

  //----------------------EXPANSION DE DIRECCION Y DATOS PERSONALES
  panelOpenState = false;

  //----------------------EMAIL
  email = new FormControl('', [Validators.required, Validators.email]);

    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'You must enter a value';
      }

      return this.email.hasError('email') ? 'Correo no valido' : '';
    }
    
    ngOnInit(): void{

     this.countries = this.direccionService.getCountries();
     this.filPais = this.control.valueChanges
          .pipe(
            startWith(''),
            map(value => this.findOption(value))
          );

      this.deleteCuenta(1);
    //-----------------------Codigo Proveedor
      this.proveedorService.getId().subscribe(
        identificador => 
            this.proveedorNuevo.codigo = identificador+1 < 10 ? "PR000"+(identificador+1) :
            identificador+1 < 100 ? "PR00"+(identificador+1) : 
            identificador+1 < 1000 ? "PR0"+(identificador+1) : 
            (identificador+1).toString() 
      );
    //---------------------Para las regiones de Direccion
    for (let i=1; i<=25; i++) {
      if(i<10) {
        this.region[i] = Region.instance(`0${i}`);
      }else {
        this.region[i] = Region.instance(`${i}`);
      }
    }
    this.region = this.region.filter(reg => reg != null);

    if(this.data != null) {
      this.cargarProveedor();
    }
  }

    //---------------------Autocomplete PAIS
    control: FormControl = new FormControl();
    filPais!: Observable<any[]>;
    findOption(value: string) {
      const filterValue = value.toLowerCase();
      return this.countries.filter((countries) => countries.value.toLowerCase().indexOf(filterValue) === 0);
    }
    onSelectCountry(id:any,i:number):void {
      if(id === "Perú") {
        this.dataUbigeo[i].show = true;
      }else {
        this.dataUbigeo[i].show = false;
        this.direccion[i].departamento = '';
        this.dataUbigeo[i].provincia = null;
        this.dataUbigeo[i].distrito = null;
        this.dataUbigeo[i].ubigeo = null;
      }
    }

    onSelect(id:string,i:number):void {
      if(id) {
        this.dataUbigeo[i].provincia = Region.instance(id).getProvincies().filter(provincia => provincia != null);
        // this.provincias = Region.instance(id).getProvincies().filter(provincia => provincia != null);
        this.dataUbigeo[i].distrito = null;
        this.dataUbigeo[i].ubigeo = null;
      }
    }

    filtroProvincia(id:string,i:number):void {
      if(id) {
        this.dataUbigeo[i].distrito = Province.instance(id).getDistricts().filter(distrito => distrito != null);
        this.dataUbigeo[i].ubigeo = null
      }
    }

    obtenerUbigeo(id:string,i:number):void {
      this.dataUbigeo[i].ubigeo = id;
    }

    //---------------------Cerrar dialogo
    onClose(): void {
      //this.proveedorService.form.reset();
      //this.proveedorService.initializeFormGroup();
      this.dialogRef.close();
      this.router.navigate(['/maestro/proveedores'])
    }
    //---------------------Limpiar dialogo
   
    //---------------------traer datos de un proveedor 
    cargarProveedor(): void {
        if(this.data.id) {
          this.proveedorService.getProveedor(this.data.id).subscribe(
            json => {
              console.log(json)
              this.proveedorNuevo = json.proveedor;
              this.direccion = json.direccion;
              if(this.direccion.length > 1) {
                for(let i=0; i<this.direccion.length; i++) {
                  if(this.direccion[i].pais === "Perú") {
                    if(i===0) {
                      this.dataUbigeo[i] = {
                        country: [],
                        region: [],
                        provincia: Region.instance(this.direccion[i].departamento).getProvincies(),
                        distrito: Province.instance(this.direccion[i].provincia).getDistricts(),
                        ubigeo: "",
                        show: true
                      }
                    }else {
                      this.dataUbigeo.push({
                        country: [],
                        region: [],
                        provincia: Region.instance(this.direccion[i].departamento).getProvincies(),
                        distrito: Province.instance(this.direccion[i].provincia).getDistricts(),
                        ubigeo: "",
                        show: true
                      });
                    }
                  }else {
                    this.dataUbigeo.push({
                      country: [],
                      region: [],
                      provincia: null,
                      distrito: null,
                      ubigeo: "",
                      show: false
                    });
                  }
                }
              }
              this.cuentaBancaria = json.cuentaBancaria;
              this.personaContacto = json.personaContacto;
            }
          )
        }
    }
  
    //---------------Alerta 
    durationInSeconds = 5;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
   
    public create():void{
      this.proveedorService.create(this.proveedorNuevo, this.personaContacto, this.cuentaBancaria, this.direccion).subscribe(
            proveedor => { 
              this.onClose();
              this.router.navigate(['/maestro/proveedores']); 
              this._snackBar.openFromComponent(SaveNotifComponent, {
                duration: this.durationInSeconds * 1000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                
              });
            }
          )
    }

    //---------------------EDIT Proveedor
    updated(): void {
      this.proveedorService.update(this.proveedorNuevo, this.personaContacto, this.cuentaBancaria, this.direccion).subscribe(
        json => {
          this.onClose();
          this.router.navigate(['/maestro/proveedores'])
          // swal('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
        })
    }
    
    //--------------------CUENTA BANCARIA
    idCuenta = 1;
    CUENTAS = [ new Cuenta(this.idCuenta, '', 0 , 0, '','')];
    isUpdate = null;
    addCuenta(Entity:any){
      this.cuentaBancaria.push({
        id:null,
        cci: "",
        entidad:"",
        moneda: "",
        numCuenta: "",
        tipoCuenta: "",
        proveedorId: null
      });
    }
    
    deleteCuenta(id:any){
      this.cuentaBancaria.splice(id, 1);
    }

    //--------------------DIRECCIONES
    idDireccion = 1;
    DIRECCION = [ new Direcciones(this.idDireccion, '', '' , '', '','','')];
    
    addDireccion(Entity:any){
      this.direccion.push({
        id:null,
        direccion:'', 
        pais:'',
        departamento:'',
        provincia:'',
        distrito:'',
        ubigeo:'',
        clienteId: null
      });

      this.dataUbigeo.push({
        country: [],
        region: [],
        provincia: null,
        distrito: null,
        ubigeo: "",
        show: false
      });
    }
    
    deleteDireccion(id:any){
      this.direccion.splice(id, 1);
      this.dataUbigeo.splice(id, 1);
    }
      
    //--------------------PERSONA DE CONTACTO
    idContacto = 1;
    CONTACTO = [ new Contactos(this.idContacto, '', '' , '', '')];
    
    addContacto(Entity:any){
      this.personaContacto.push({
        cargo: "",
        clienteId: null,
        correo: "",
        id: null,
        nombre: "",
        telefono: "",
        proveedorId: null
      });
    }
    
    deleteContacto(id:any){
      this.personaContacto.splice(id, 1);
    }
  
}
