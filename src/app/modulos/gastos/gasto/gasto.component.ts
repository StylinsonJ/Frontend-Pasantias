import { Component,OnInit } from '@angular/core';
import { Producto } from '../../../intefaces/home/compra.class';
import { FormControl,Validators} from '@angular/forms';
//import { AngularFileUploaderComponent } from "angular-file-uploader";
import { ActivatedRoute, Router } from '@angular/router';
import { District, Region, Province } from "ubigeos";
import { startWith, map} from 'rxjs/operators';
import { Observable} from 'rxjs';
//COMPONENTE
import { Direccion } from 'src/app/componentes/maestro/direccion'; 
//SERVICE
import { CountryI } from 'src/app/intefaces/maestro/pais.interface';
import { DireccionService } from 'src/app/services/maestro/direccion.service';
//INTERFACE
import { Direcciones } from '../../../intefaces/maestro/direcciones.interface';
import { DataUbigeoI } from 'src/app/intefaces/maestro/data-ubigeo.interface';


@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css']
})
export class GastoComponent implements OnInit {
//autocomplete
myControl = new FormControl();
options: string[] = ['Perú', 'Venezuela', 'Japón'];
filteredOptions!: Observable<string[]>;
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
  public direccion: Direccion[] = [{ 
    id:null,
    direccion:'', 
    pais:'',
    departamento:'',
    provincia:'',
    distrito:'',
    ubigeo:'',
    clienteId:null}];

  constructor(
    public route: ActivatedRoute,
    private direccionService: DireccionService,
    private router: Router,
    
  ) { }

  //producto
  ngOnInit(): void{

    this.countries = this.direccionService.getCountries();
    this.filPais = this.control.valueChanges
         .pipe(
           startWith(''),
           map(value => this.findOption(value))
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

 //----------------------PRODUCTOS
    id = 1;

    PRODUCTOS = [ new Producto(this.id, '', '', 0, 0, 0, 0)];

    isUpdate = null;
    addProducto(Entity:any){
      if(this.isUpdate != null){
        this.update(this.TempEdit, Entity)
      }else{
        this.id +=1;
        const productoEntry = new Producto(Entity.id, Entity.producto, Entity.descripcion, Entity.cantidad, Entity.val_venta, Entity.IGV, Entity.total);
        this.PRODUCTOS.push(productoEntry);
        this.resetProducto(Entity);
      }
    }
    
    
    TempEdit = null;
    update(Model:any, Entity:any){
      for(let i = 0; i < this.PRODUCTOS.length; ++i){
        if (this.PRODUCTOS[i].id === Model.id){
          Entity.PRODUCTOS[i].producto = Entity.producto;
          Entity.PRODUCTOS[i].descripcion = Entity.descripcion;
          Entity.PRODUCTOS[i].cantidad = Entity.cantidad;
          Entity.PRODUCTOS[i].val_venta = Entity.val_venta;
          Entity.PRODUCTOS[i].IGV = Entity.IGV;
          Entity.PRODUCTOS[i].total = Entity.total;
        }
      }

      this.resetProducto(Entity);
      this.isUpdate = null;
    }

    deleteProducto(id:any){
      for(let i=0; i < this.PRODUCTOS.length; ++i){
        if(this.PRODUCTOS[i].id === id){
          this.PRODUCTOS.splice(i,1);
        }
      }
    }
    
    EditProducto(Entity:any, Model:any){
      Model.producto = Entity.producto;
      Model.descripcion = Entity.descripcion;
      Model.cantidad = Entity.cantidad;
      Model.val_venta = Entity.val_venta;
      Model.IGV = Entity.IGV;
      Model.total = Entity.total;
    }

    resetProducto(Entity :any){
      Entity.producto = '';
      Entity.descripcion = '';
      Entity.cantidad = 0;
      Entity.val_venta = 0;
      Entity.IGV = 0;
      Entity.total =  0;
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

  /*---------------------Cerrar dialogo
  onClose(): void {
    //this.proveedorService.form.reset();
    //this.proveedorService.initializeFormGroup();
    this.dialogRef.close();
    this.router.navigate(['/gastos/list'])
  }
*/
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

}
