import { Component,Inject, OnInit  } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {FormControl,Validators} from '@angular/forms';
import { District, Region, Province } from "ubigeos";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { startWith, map} from 'rxjs/operators';

//COMPONENTE
import { Direccion } from 'src/app/componentes/maestro/direccion'; 
import { Cliente } from 'src/app/componentes/maestro/cliente';
import { PersonaContacto } from 'src/app/componentes/maestro/persona-contacto';
//SERVICE
import { ClientesService } from 'src/app/services/maestro/clientes.service';
import { CountryI } from 'src/app/intefaces/maestro/pais.interface';
import { DireccionService } from 'src/app/services/maestro/direccion.service';
//INTERFACE
import { Direcciones } from '../../../../intefaces/maestro/direcciones.interface';
import { Contactos } from '../../../../intefaces/maestro/contactos.interfaces';
import { DataUbigeoI } from 'src/app/intefaces/maestro/data-ubigeo.interface';

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
    public personaContacto: PersonaContacto = new PersonaContacto();
    //public direccion:       Direccion = new Direccion();
    public direccion: Direccion = new Direccion(0,'', '', '','','','',0);

    //AGREGAR MAS DIRECCIONES
    public dirID = 1;
    public DIRECCIONES = [ new Direccion(this.dirID, '', '', '','','','',0)];
    isUpdate = null;
    TempEdit = null;
    addDir(Entity:any){
      if(this.isUpdate != null){
        this.updateDir(this.TempEdit, Entity)
      }else{
        this.dirID +=1;
        const dirEntry = new Direccion(
          Entity.dirId, 
          Entity.direccion, 
          Entity.pais,
          Entity.departamento, 
          Entity.provincia,
          Entity.distrito, 
          Entity.ubigeo, 
          Entity.clienteId)
        this.DIRECCIONES.push(dirEntry);
        this.resetDir(Entity);
      }
    }
    updateDir(Model:any, Entity:any){
      for(let i = 0; i < this.DIRECCIONES.length; ++i){
        if (this.DIRECCIONES[i].id === Model.id){
          Entity.DIRECCIONES[i].direccion    = Entity.direccion;
          Entity.DIRECCIONES[i].pais         = Entity.pais;
          Entity.DIRECCIONES[i].departamento = Entity.departamento;
          Entity.DIRECCIONES[i].provincia    = Entity.provincia;
          Entity.DIRECCIONES[i].distrito     = Entity.distrito;
          Entity.DIRECCIONES[i].ubigeo       = Entity.ubigeo;
          Entity.DIRECCIONES[i].clienteId    = Entity.clienteId;
        }
      }
      this.resetDir(Entity);
      this.isUpdate = null;
    }
      deleteDir(id:any){
        for(let i=0; i < this.DIRECCIONES.length; ++i){
          if(this.DIRECCIONES[i].id === id){
            this.DIRECCIONES.splice(i,1);
          }
        }
      }
      
      EditDir(Entity:any, Model:any){
        Model.direccion =  Entity.direccion,
        Model.pais =Entity.pais,
        Model.departamento = Entity.departamento, 
        Model.provincia = Entity.provincia,
        Model.distrito = Entity.distrito, 
        Model.ubigeo =   Entity.ubigeo, 
        Model.clienteId=  Entity.clienteId
      }

      resetDir(Entity :any){
        Entity.direccion = '';
        Entity.pais = '';
        Entity.departamento = '';
        Entity.provincia = '';
        Entity.distrito= ''; 
        Entity.ubigeo= ''; 
        Entity.clienteId = 0;
      }



    edit: boolean = false;

    //LA DATA SE LLEVA ClienteComponent
    constructor(
      private clienteService: ClientesService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      public dialogRef: MatDialogRef<ClienteComponent>) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.clienteService.getCliente(params.id)
        .subscribe(
          res => {
            console.log(res);
              this.clienteNuevo = res;
              this.edit = true;
          },
          err => console.log(err)
        )
    }

    this.clienteService.getId().subscribe(
      identificador => 
          this.clienteNuevo.codigo = identificador+1 < 10 ? "CL000"+(identificador+1) :
          identificador+1 < 100 ? "CL00"+(identificador+1) : 
          identificador+1 < 1000 ? "CL0"+(identificador+1) : 
          identificador.toString() 
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
    //---------------------------------

    saveNewCliente(): void {
      this.clienteService.saveCliente(this.clienteNuevo, this.personaContacto, this.direccion)
        .subscribe(
          response => { 
            console.log(response);
            this.router.navigate(['/maestro']);
          },
          error => 
            console.log(error)
          
          // swal('Nuevo Cliente', `El cliente ${proveedor.nombre} ha sido creado con éxito`, 'success')
        )
    }
  
  
    updateCliente(): void {
      this.clienteService.updateCliente(this.clienteNuevo)
      .subscribe(
        json => {
          console.log(json);
          this.router.navigate(['/maestro'])
          // swal('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
        },
        err => console.error(err)
      )
      }
    
    //CERRAR REGISTRO
    onClose(): void {
      this.dialogRef.close();
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
