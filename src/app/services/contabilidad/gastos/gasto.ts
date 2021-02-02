import { Concepto } from "../concepto/concepto";
import { TipoGasto } from "../tipo_gasto/tipo-gasto";

export class Gasto {
    id: number | undefined;
    codigo: string | undefined;
    tipoDocumento: string | undefined;
    numDocumento: string | undefined;
    fecha: Date | undefined;
    direccion: string | undefined;
    descripcion: string | undefined;
    valorVenta: number | undefined;
    igv: number | undefined;
    precioVenta: number | undefined;
    estadoPago: string | undefined;
    fechaVenc: Date | undefined;
    tipoGastoId: TipoGasto | undefined;
    concepto: Concepto | undefined;
}