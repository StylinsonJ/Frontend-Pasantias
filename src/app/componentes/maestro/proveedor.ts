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

export interface ProveedoresList {
    id: number;
    codigo: string;
    rucDni: string;
    razonSocial: string;
    fechaIni: Date;
    rubroActividad: string;
    comentarios: string;
    impuestoAsociado: string;
    tipoPago: string;
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