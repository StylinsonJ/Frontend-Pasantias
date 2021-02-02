export interface Tipo_Gasto{
    id: number;
    name: string;
}
      
export interface Concepto{
    id: number;
    idGasto: number;
    name: string;
}
