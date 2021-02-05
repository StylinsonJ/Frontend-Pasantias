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
  
