import { Proveedor } from "./proveedor";

export class PersonaContacto {
    id: number | undefined;
    nombre: string | undefined;
    cargo: string | undefined;
    telefono: string | undefined;
    correo: string | undefined;
    proveedorId: Proveedor | undefined;
}
