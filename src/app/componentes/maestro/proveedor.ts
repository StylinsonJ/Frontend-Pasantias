export interface ProveedorListResponse {
    content: Proveedor[];
    totalElements: number;
}

export class Proveedor {
    id: number | undefined;
    codigo: string | undefined;
    rucDni: string | undefined;
    razonSocial: string | undefined;
    fechaIni: Date | undefined;
    rubroActividad: string | undefined;
    comentarios: string | undefined;
    impuestoAsociado: string | undefined;
    tipoPago: string | undefined;
}
/*
export class Proveedor {
    id: number | undefined;
    codigo: string | undefined;
    rucDni: string | undefined;
    razonSocial: string | undefined;
    fechaIni: Date | undefined;
    rubroActividad: string | undefined;
    direccion: string | undefined;
    pais: string | undefined;
    departamento: string="";
    provincia: string="";
    distrito: string="";
    ubigeo: string="";
    comentarios: string | undefined;
    impuestoAsociado: string | undefined;
    tipoPago: string | undefined;
}
 */