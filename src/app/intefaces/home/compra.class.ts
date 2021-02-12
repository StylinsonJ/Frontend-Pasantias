export class Producto {
    constructor (
      public id:number,
      public producto: string,
      public descripcion: string,
      public cantidad: number,
      public val_venta: number,
      public IGV: number,
      public total: number
    ) {}
  }
    
  