import { Proveedor } from "./proveedor";
import { Cliente } from "./cliente";

export class PersonaContacto {
    id: number | undefined | null;
    nombre: string | undefined;
    cargo: string | undefined;
    telefono: string | undefined;
    correo: string | undefined;
    proveedorId: Proveedor | undefined | null;
    clienteId: Cliente | undefined | null;
}
