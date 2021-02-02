import { TipoGasto } from "../tipo_gasto/tipo-gasto";

export class Concepto {
    id: number | undefined;
    nombre: string | undefined;
    tipoGastoId: TipoGasto | undefined;
}