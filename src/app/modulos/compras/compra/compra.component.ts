import { Component,OnInit } from '@angular/core';
import { Producto } from '../../../intefaces/home/compra.class';
import {FormControl,Validators} from '@angular/forms';
//import { AngularFileUploaderComponent } from "angular-file-uploader";
import {MatDialog} from '@angular/material/dialog';
import { ContactoComponent } from './contacto/contacto.component';

export interface NuevoContacto {
  id: number;
  nombre: string;
  cargo: string;
  telefono: number;
  correo: string;
};

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  constructor( public dialog: MatDialog) { }

  //SUBIR ARCHIVO
  afuConfig = {
    uploadAPI: {
      url:"https://example-file-upload-api"
    }
};

  //producto
  ngOnInit(){
    this.deleteProducto(1);
  }

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

  //CONTACTO-ABRIR DIALOGO
  openDialog():void {
    const dialogRef = this.dialog.open(ContactoComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

 

  

}
