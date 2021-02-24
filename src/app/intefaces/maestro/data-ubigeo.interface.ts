import { District, Region, Province } from "ubigeos";
import { CountryI } from "./pais.interface";
export interface DataUbigeoI {
    country: CountryI[];
    region: Region[] | null;
    provincia: Province[] | null;
    distrito: District[] | null;
    ubigeo: string | null;
    show: boolean;
}