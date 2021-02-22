export class Cuenta {
  constructor (
    public id:number,
    public entidad: string,
    public nro_cuenta: number,
    public CCI: number,
    public tipo_cuenta: string,
    public moneda: string
   ) {}
}
  
export interface Banco {
     id:number,
     entidad: string,
     nro_cuenta: number,
     CCI: number,
     tipo_cuenta: string,
     moneda: string
}

