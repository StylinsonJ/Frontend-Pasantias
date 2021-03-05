export interface ClienteListResponse {
    content: Cliente[];
    totalElements:number;
}

export class Cliente {
    id: number | undefined;
    codigo: string | undefined;
    rucDni: string | undefined;
    razonSocial: string | undefined;
    fechaIni: Date | undefined;
    rubroActividad: string | undefined;
    comentarios: string | undefined
}
