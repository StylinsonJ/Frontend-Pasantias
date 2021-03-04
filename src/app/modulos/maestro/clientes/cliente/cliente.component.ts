import { Component, Inject, OnInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl,Validators} from '@angular/forms';
import { District, Region, Province } from "ubigeos";
import { ActivatedRoute, Router } from '@angular/router';
//COMPONENTE
import { Direccion } from 'src/app/componentes/maestro/direccion'; 
import { Cliente } from 'src/app/componentes/maestro/cliente';
import { PersonaContacto } from 'src/app/componentes/maestro/persona-contacto';
//SERVICE
import { ClientesService } from 'src/app/services/maestro/clientes.service';
import { CountryI } from 'src/app/intefaces/maestro/pais.interface';
import { DataUbigeoI } from 'src/app/intefaces/maestro/data-ubigeo.interface';
import { DireccionService } from 'src/app/services/maestro/direccion.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
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

  // CLASES
  public clienteNuevo:    Cliente = new Cliente();
  public personaContacto: PersonaContacto[] = [{
    cargo: "",
    clienteId: null,
    correo: "",
    id: 0,
    nombre: "",
    telefono: "",
    proveedorId: null
  }];
  //public direccion:       Direccion = new Direccion();
  public direccion: Direccion[] = [{ 
    id:null,
    direccion:'', 
    pais:'',
    departamento:'',
    provincia:'',
    distrito:'',
    ubigeo:'',
    clienteId:null}];

    //LA DATA SE LLEVA ClienteComponent
    constructor(
      public clienteService: ClientesService,
      private direccionService: DireccionService,
      public router: Router,
      public dialogRef: MatDialogRef<ClienteComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.countries = this.direccionService.getCountries();
    this.filPais = this.control.valueChanges
          .pipe(
            startWith(''),
            map(value => this.findOption(value))
          );

    this.clienteService.getId().subscribe(
      identificador => 
          this.clienteNuevo.codigo = identificador+1 < 10 ? "CL000"+(identificador+1) :
          identificador+1 < 100 ? "CL00"+(identificador+1) : 
          identificador+1 < 1000 ? "CL0"+(identificador+1) : 
          (identificador+1).toString() 
    );
  
    // PARA SELECT DEPARTAMENTO
    for (let i=1; i<=25; i++) {
      if(i<10) {
        this.region[i] = Region.instance(`0${i}`);
      }else {
        this.region[i] = Region.instance(`${i}`);
      }
    }
    this.region = this.region.filter(reg => reg != null);

    if(this.data != null) {
      this.cargarCliente();
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
    //---------------------------------

    saveNewCliente(): void {
      this.clienteService.saveCliente(this.clienteNuevo, this.personaContacto, this.direccion);

          // swal('Nuevo Cliente', `El cliente ${proveedor.nombre} ha sido creado con éxito`, 'success')
    }
  
    updateCliente(): void {
      this.clienteService.updateCliente(this.clienteNuevo, this.direccion, this.personaContacto)
      .subscribe(
        json => {
          // console.log(json);
          this.router.navigate(['/maestro/clientes']);
          this.clienteService.update(this.clienteNuevo);
          // swal('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
        },
        err => console.error(err)
      )
    }

    //---------------------traer datos de un cliente
    cargarCliente(): void {
      if(this.data.id) {
        this.clienteService.getCliente(this.data.id).subscribe(
          json => {
            console.log(json)
            this.clienteNuevo = json.cliente;
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
            this.personaContacto = json.personaContacto;
          }
        )
      }
    }
    
    //CERRAR REGISTRO
    onClose(): void {
      this.dialogRef.close();
    }

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
