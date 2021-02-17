//import { Proveedor } from "./proveedor";
import { Cliente } from "./cliente";

export class Direccion{
    constructor (
        public id: number | undefined,
        public direccion: string | undefined,
        public pais: string | undefined,
        public departamento: string="",
        public provincia: string="",
        public distrito: string="",
        public ubigeo: string="",
    //    proveedorId: Proveedor | undefined;
        public clienteId: number | Cliente | undefined ,
    ){}
}