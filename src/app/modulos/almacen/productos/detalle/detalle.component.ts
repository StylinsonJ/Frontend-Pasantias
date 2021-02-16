import { Component, OnInit } from '@angular/core';
import { DetalleProd} from '../../../../intefaces/productos/detalle_prod.class'
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  constructor() { }

   //Detalle de producto
   ngOnInit(){
    this.deleteDetalleProd(1);
  }

    id = 1;

    DETALLE_PROD = [ new DetalleProd(this.id, '', '', '', '','','','', '', '',0)];

    isUpdate = null;
    addDetalleProd(Entity:any){
      if(this.isUpdate != null){
        this.update(this.TempEdit, Entity)
      }else{
        this.id +=1;
        const detalleEntry = new DetalleProd(
          Entity.id,
          Entity.guia,
          Entity.familia, 
          Entity.sub_familia, 
          Entity.tipo, 
          Entity.marca, 
          Entity.modelo,
          Entity.serie, 
          Entity.stock, 
          Entity.codigo_int,
          Entity.saldo
          );
        this.DETALLE_PROD.push(detalleEntry);
        this.resetProducto(Entity);
      }
    }
    
    TempEdit = null;
    update(Model:any, Entity:any){
      for(let i = 0; i < this.DETALLE_PROD.length; ++i){
        if (this.DETALLE_PROD[i].id === Model.id){
          Entity.DETALLE_PROD[i].guia = Entity.guia;
          Entity.DETALLE_PROD[i].familia = Entity.familia;
          Entity.DETALLE_PROD[i].sub_familia = Entity.sub_familia;
          Entity.DETALLE_PROD[i].tipo = Entity.tipo;
          Entity.DETALLE_PROD[i].marca = Entity.marca;
          Entity.DETALLE_PROD[i].modelo = Entity.modelo;
          Entity.DETALLE_PROD[i].serie = Entity.serie, 
          Entity.DETALLE_PROD[i].stock = Entity.stock, 
          Entity.DETALLE_PROD[i].codigo_int  = Entity.codigo_int,
          Entity.DETALLE_PROD[i].saldo  = Entity.saldo
        }
      }

      this.resetProducto(Entity);
      this.isUpdate = null;
    }

    deleteDetalleProd(id:any){
      for(let i=0; i < this.DETALLE_PROD.length; ++i){
        if(this.DETALLE_PROD[i].id === id){
          this.DETALLE_PROD.splice(i,1);
        }
      }
    }
    
    EditDetalleProd(Entity:any, Model:any){
          Model.guia =  Entity.guia,
          Model.familia = Entity.familia, 
          Model.sub_familia = Entity.sub_familia, 
          Model.tipo = Entity.tipo, 
          Model.marca = Entity.marca, 
          Model.modelo = Entity.modelo,
          Model.serie = Entity.serie, 
          Model.stock = Entity.stock, 
          Model.codigo_int = Entity.codigo_int,
          Model.saldo = Entity.saldo
    }

    resetProducto(Entity :any){
          Entity.guia = '';
          Entity.familia = '';
          Entity.sub_familia = ''; 
          Entity.tipo = ''; 
          Entity.marca = ''; 
          Entity.modelo = '';
          Entity.serie = '';
          Entity.stock = '';
          Entity.codigo_int = '';
          Entity.saldo = 0;
    }

}
