import { Proveedor } from "./proveedor";

export class CuentaBancaria {
    public id:number | undefined;
    public entidad: string | undefined;
    public numCuenta: string | undefined;
    public cci: string | undefined;
    public tipoCuenta: string | undefined;
    public moneda: string | undefined;
    proveedorId: Proveedor | undefined | null;
}
