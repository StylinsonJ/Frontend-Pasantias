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
    direccionDos: string | undefined;
    paisDos: string | undefined;
    departamentoDos: string="";
    provinciaDos: string="";
    distritoDos: string="";
    ubigeoDos: string="";
    comentarios: string | undefined;
    impuestoAsociado: string | undefined;
    tipoPago: string | undefined;
}
