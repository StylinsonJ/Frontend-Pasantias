import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Ubigeo, { District, Region, Province } from "ubigeos";
//COMPONENTES
import { Proveedor } from 'src/app/componentes/maestro/proveedor';
import { Direccion } from 'src/app/componentes/maestro/direccion';
import { PersonaContacto } from 'src/app/componentes/maestro/persona-contacto';
import { CuentaBancaria } from 'src/app/componentes/maestro/cuenta-bancaria';
import { CountryI } from 'src/app/intefaces/maestro/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private urlEndPoint: string = 'http://localhost:8082/api/proveedores';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  private countries: CountryI[] = [
    {
        id: "AD",
        value: "Andorra"
    },
    {
        id: "AE",
        value: "Emiratos Árabes Unidos"
    },
    {
        id: "AF",
        value: "Afganistán"
    },
    {
        id: "AG",
        value: "Antigua y Barbuda"
    },
    {
        id: "AI",
        value: "Anguila"
    },
    {
        id: "AL",
        value: "Albania"
    },
    {
        id: "AM",
        value: "Armenia"
    },
    {
        id: "AO",
        value: "Angola"
    },
    {
        id: "AQ",
        value: "Antártida"
    },
    {
        id: "AR",
        value: "Argentina"
    },
    {
        id: "AS",
        value: "Samoa Americana"
    },
    {
        id: "AT",
        value: "Austria"
    },
    {
        id: "AU",
        value: "Australia"
    },
    {
        id: "AW",
        value: "Aruba"
    },
    {
        id: "AX",
        value: "Islas Åland"
    },
    {
        id: "AZ",
        value: "Azerbaiyán"
    },
    {
        id: "BA",
        value: "Bosnia y Herzegovina"
    },
    {
        id: "BB",
        value: "Barbados"
    },
    {
        id: "BD",
        value: "Bangladés"
    },
    {
        id: "BE",
        value: "Bélgica"
    },
    {
        id: "BF",
        value: "Burkina Faso"
    },
    {
        id: "BG",
        value: "Bulgaria"
    },
    {
        id: "BH",
        value: "Baréin"
    },
    {
        id: "BI",
        value: "Burundi"
    },
    {
        id: "BJ",
        value: "Benín"
    },
    {
        id: "BL",
        value: "San Bartolomé"
    },
    {
        id: "BM",
        value: "Bermudas"
    },
    {
        id: "BN",
        value: "Brunéi"
    },
    {
        id: "BO",
        value: "Bolivia"
    },
    {
        id: "BQ",
        value: "Caribe neerlandés"
    },
    {
        id: "BR",
        value: "Brasil"
    },
    {
        id: "BS",
        value: "Bahamas"
    },
    {
        id: "BT",
        value: "Bután"
    },
    {
        id: "BV",
        value: "Isla Bouvet"
    },
    {
        id: "BW",
        value: "Botsuana"
    },
    {
        id: "BY",
        value: "Bielorrusia"
    },
    {
        id: "BZ",
        value: "Belice"
    },
    {
        id: "CA",
        value: "Canadá"
    },
    {
        id: "CC",
        value: "Islas Cocos"
    },
    {
        id: "CD",
        value: "República Democrática del Congo"
    },
    {
        id: "CF",
        value: "República Centroafricana"
    },
    {
        id: "CG",
        value: "Congo"
    },
    {
        id: "CH",
        value: "Suiza"
    },
    {
        id: "CI",
        value: "Côte d’Ivoire"
    },
    {
        id: "CK",
        value: "Islas Cook"
    },
    {
        id: "CL",
        value: "Chile"
    },
    {
        id: "CM",
        value: "Camerún"
    },
    {
        id: "CN",
        value: "China"
    },
    {
        id: "CO",
        value: "Colombia"
    },
    {
        id: "CR",
        value: "Costa Rica"
    },
    {
        id: "CU",
        value: "Cuba"
    },
    {
        id: "CV",
        value: "Cabo Verde"
    },
    {
        id: "CW",
        value: "Curazao"
    },
    {
        id: "CX",
        value: "Isla de Navidad"
    },
    {
        id: "CY",
        value: "Chipre"
    },
    {
        id: "CZ",
        value: "Chequia"
    },
    {
        id: "DE",
        value: "Alemania"
    },
    {
        id: "DJ",
        value: "Yibuti"
    },
    {
        id: "DK",
        value: "Dinamarca"
    },
    {
        id: "DM",
        value: "Dominica"
    },
    {
        id: "DO",
        value: "República Dominicana"
    },
    {
        id: "DZ",
        value: "Argelia"
    },
    {
        id: "EC",
        value: "Ecuador"
    },
    {
        id: "EE",
        value: "Estonia"
    },
    {
        id: "EG",
        value: "Egipto"
    },
    {
        id: "EH",
        value: "Sáhara Occidental"
    },
    {
        id: "ER",
        value: "Eritrea"
    },
    {
        id: "ES",
        value: "España"
    },
    {
        id: "ET",
        value: "Etiopía"
    },
    {
        id: "FI",
        value: "Finlandia"
    },
    {
        id: "FJ",
        value: "Fiyi"
    },
    {
        id: "FK",
        value: "Islas Malvinas"
    },
    {
        id: "FM",
        value: "Micronesia"
    },
    {
        id: "FO",
        value: "Islas Feroe"
    },
    {
        id: "FR",
        value: "Francia"
    },
    {
        id: "GA",
        value: "Gabón"
    },
    {
        id: "GB",
        value: "Reino Unido"
    },
    {
        id: "GD",
        value: "Granada"
    },
    {
        id: "GE",
        value: "Georgia"
    },
    {
        id: "GF",
        value: "Guayana Francesa"
    },
    {
        id: "GG",
        value: "Guernsey"
    },
    {
        id: "GH",
        value: "Ghana"
    },
    {
        id: "GI",
        value: "Gibraltar"
    },
    {
        id: "GL",
        value: "Groenlandia"
    },
    {
        id: "GM",
        value: "Gambia"
    },
    {
        id: "GN",
        value: "Guinea"
    },
    {
        id: "GP",
        value: "Guadalupe"
    },
    {
        id: "GQ",
        value: "Guinea Ecuatorial"
    },
    {
        id: "GR",
        value: "Grecia"
    },
    {
        id: "GS",
        value: "Islas Georgia del Sur y Sandwich del Sur"
    },
    {
        id: "GT",
        value: "Guatemala"
    },
    {
        id: "GU",
        value: "Guam"
    },
    {
        id: "GW",
        value: "Guinea-Bisáu"
    },
    {
        id: "GY",
        value: "Guyana"
    },
    {
        id: "HK",
        value: "RAE de Hong Kong (China)"
    },
    {
        id: "HM",
        value: "Islas Heard y McDonald"
    },
    {
        id: "HN",
        value: "Honduras"
    },
    {
        id: "HR",
        value: "Croacia"
    },
    {
        id: "HT",
        value: "Haití"
    },
    {
        id: "HU",
        value: "Hungría"
    },
    {
        id: "ID",
        value: "Indonesia"
    },
    {
        id: "IE",
        value: "Irlanda"
    },
    {
        id: "IL",
        value: "Israel"
    },
    {
        id: "IM",
        value: "Isla de Man"
    },
    {
        id: "IN",
        value: "India"
    },
    {
        id: "IO",
        value: "Territorio Británico del Océano Índico"
    },
    {
        id: "IQ",
        value: "Irak"
    },
    {
        id: "IR",
        value: "Irán"
    },
    {
        id: "IS",
        value: "Islandia"
    },
    {
        id: "IT",
        value: "Italia"
    },
    {
        id: "JE",
        value: "Jersey"
    },
    {
        id: "JM",
        value: "Jamaica"
    },
    {
        id: "JO",
        value: "Jordania"
    },
    {
        id: "JP",
        value: "Japón"
    },
    {
        id: "KE",
        value: "Kenia"
    },
    {
        id: "KG",
        value: "Kirguistán"
    },
    {
        id: "KH",
        value: "Camboya"
    },
    {
        id: "KI",
        value: "Kiribati"
    },
    {
        id: "KM",
        value: "Comoras"
    },
    {
        id: "KN",
        value: "San Cristóbal y Nieves"
    },
    {
        id: "KP",
        value: "Corea del Norte"
    },
    {
        id: "KR",
        value: "Corea del Sur"
    },
    {
        id: "KW",
        value: "Kuwait"
    },
    {
        id: "KY",
        value: "Islas Caimán"
    },
    {
        id: "KZ",
        value: "Kazajistán"
    },
    {
        id: "LA",
        value: "Laos"
    },
    {
        id: "LB",
        value: "Líbano"
    },
    {
        id: "LC",
        value: "Santa Lucía"
    },
    {
        id: "LI",
        value: "Liechtenstein"
    },
    {
        id: "LK",
        value: "Sri Lanka"
    },
    {
        id: "LR",
        value: "Liberia"
    },
    {
        id: "LS",
        value: "Lesoto"
    },
    {
        id: "LT",
        value: "Lituania"
    },
    {
        id: "LU",
        value: "Luxemburgo"
    },
    {
        id: "LV",
        value: "Letonia"
    },
    {
        id: "LY",
        value: "Libia"
    },
    {
        id: "MA",
        value: "Marruecos"
    },
    {
        id: "MC",
        value: "Mónaco"
    },
    {
        id: "MD",
        value: "Moldavia"
    },
    {
        id: "ME",
        value: "Montenegro"
    },
    {
        id: "MF",
        value: "San Martín"
    },
    {
        id: "MG",
        value: "Madagascar"
    },
    {
        id: "MH",
        value: "Islas Marshall"
    },
    {
        id: "MK",
        value: "Macedonia del Norte"
    },
    {
        id: "ML",
        value: "Mali"
    },
    {
        id: "MM",
        value: "Myanmar (Birmania)"
    },
    {
        id: "MN",
        value: "Mongolia"
    },
    {
        id: "MO",
        value: "RAE de Macao (China)"
    },
    {
        id: "MP",
        value: "Islas Marianas del Norte"
    },
    {
        id: "MQ",
        value: "Martinica"
    },
    {
        id: "MR",
        value: "Mauritania"
    },
    {
        id: "MS",
        value: "Montserrat"
    },
    {
        id: "MT",
        value: "Malta"
    },
    {
        id: "MU",
        value: "Mauricio"
    },
    {
        id: "MV",
        value: "Maldivas"
    },
    {
        id: "MW",
        value: "Malaui"
    },
    {
        id: "MX",
        value: "México"
    },
    {
        id: "MY",
        value: "Malasia"
    },
    {
        id: "MZ",
        value: "Mozambique"
    },
    {
        id: "NA",
        value: "Namibia"
    },
    {
        id: "NC",
        value: "Nueva Caledonia"
    },
    {
        id: "NE",
        value: "Níger"
    },
    {
        id: "NF",
        value: "Isla Norfolk"
    },
    {
        id: "NG",
        value: "Nigeria"
    },
    {
        id: "NI",
        value: "Nicaragua"
    },
    {
        id: "NL",
        value: "Países Bajos"
    },
    {
        id: "NO",
        value: "Noruega"
    },
    {
        id: "NP",
        value: "Nepal"
    },
    {
        id: "NR",
        value: "Nauru"
    },
    {
        id: "NU",
        value: "Niue"
    },
    {
        id: "NZ",
        value: "Nueva Zelanda"
    },
    {
        id: "OM",
        value: "Omán"
    },
    {
        id: "PA",
        value: "Panamá"
    },
    {
        id: "PE",
        value: "Perú"
    },
    {
        id: "PF",
        value: "Polinesia Francesa"
    },
    {
        id: "PG",
        value: "Papúa Nueva Guinea"
    },
    {
        id: "PH",
        value: "Filipinas"
    },
    {
        id: "PK",
        value: "Pakistán"
    },
    {
        id: "PL",
        value: "Polonia"
    },
    {
        id: "PM",
        value: "San Pedro y Miquelón"
    },
    {
        id: "PN",
        value: "Islas Pitcairn"
    },
    {
        id: "PR",
        value: "Puerto Rico"
    },
    {
        id: "PS",
        value: "Territorios Palestinos"
    },
    {
        id: "PT",
        value: "Portugal"
    },
    {
        id: "PW",
        value: "Palaos"
    },
    {
        id: "PY",
        value: "Paraguay"
    },
    {
        id: "QA",
        value: "Catar"
    },
    {
        id: "RE",
        value: "Reunión"
    },
    {
        id: "RO",
        value: "Rumanía"
    },
    {
        id: "RS",
        value: "Serbia"
    },
    {
        id: "RU",
        value: "Rusia"
    },
    {
        id: "RW",
        value: "Ruanda"
    },
    {
        id: "SA",
        value: "Arabia Saudí"
    },
    {
        id: "SB",
        value: "Islas Salomón"
    },
    {
        id: "SC",
        value: "Seychelles"
    },
    {
        id: "SD",
        value: "Sudán"
    },
    {
        id: "SE",
        value: "Suecia"
    },
    {
        id: "SG",
        value: "Singapur"
    },
    {
        id: "SH",
        value: "Santa Elena"
    },
    {
        id: "SI",
        value: "Eslovenia"
    },
    {
        id: "SJ",
        value: "Svalbard y Jan Mayen"
    },
    {
        id: "SK",
        value: "Eslovaquia"
    },
    {
        id: "SL",
        value: "Sierra Leona"
    },
    {
        id: "SM",
        value: "San Marino"
    },
    {
        id: "SN",
        value: "Senegal"
    },
    {
        id: "SO",
        value: "Somalia"
    },
    {
        id: "SR",
        value: "Surinam"
    },
    {
        id: "SS",
        value: "Sudán del Sur"
    },
    {
        id: "ST",
        value: "Santo Tomé y Príncipe"
    },
    {
        id: "SV",
        value: "El Salvador"
    },
    {
        id: "SX",
        value: "Sint Maarten"
    },
    {
        id: "SY",
        value: "Siria"
    },
    {
        id: "SZ",
        value: "Esuatini"
    },
    {
        id: "TC",
        value: "Islas Turcas y Caicos"
    },
    {
        id: "TD",
        value: "Chad"
    },
    {
        id: "TF",
        value: "Territorios Australes Franceses"
    },
    {
        id: "TG",
        value: "Togo"
    },
    {
        id: "TH",
        value: "Tailandia"
    },
    {
        id: "TJ",
        value: "Tayikistán"
    },
    {
        id: "TK",
        value: "Tokelau"
    },
    {
        id: "TL",
        value: "Timor-Leste"
    },
    {
        id: "TM",
        value: "Turkmenistán"
    },
    {
        id: "TN",
        value: "Túnez"
    },
    {
        id: "TO",
        value: "Tonga"
    },
    {
        id: "TR",
        value: "Turquía"
    },
    {
        id: "TT",
        value: "Trinidad y Tobago"
    },
    {
        id: "TV",
        value: "Tuvalu"
    },
    {
        id: "TW",
        value: "Taiwán"
    },
    {
        id: "TZ",
        value: "Tanzania"
    },
    {
        id: "UA",
        value: "Ucrania"
    },
    {
        id: "UG",
        value: "Uganda"
    },
    {
        id: "UM",
        value: "Islas menores alejadas de EE. UU."
    },
    {
        id: "US",
        value: "Estados Unidos"
    },
    {
        id: "UY",
        value: "Uruguay"
    },
    {
        id: "UZ",
        value: "Uzbekistán"
    },
    {
        id: "VA",
        value: "Ciudad del Vaticano"
    },
    {
        id: "VC",
        value: "San Vicente y las Granadinas"
    },
    {
        id: "VE",
        value: "Venezuela"
    },
    {
        id: "VG",
        value: "Islas Vírgenes Británicas"
    },
    {
        id: "VI",
        value: "Islas Vírgenes de EE. UU."
    },
    {
        id: "VN",
        value: "Vietnam"
    },
    {
        id: "VU",
        value: "Vanuatu"
    },
    {
        id: "WF",
        value: "Wallis y Futuna"
    },
    {
        id: "WS",
        value: "Samoa"
    },
    {
        id: "YE",
        value: "Yemen"
    },
    {
        id: "YT",
        value: "Mayotte"
    },
    {
        id: "ZA",
        value: "Sudáfrica"
    },
    {
        id: "ZM",
        value: "Zambia"
    },
    {
        id: "ZW",
        value: "Zimbabue"
    }
]

  constructor(private http: HttpClient, private router: Router) { }

  getCountries(): CountryI[] {
    return this.countries;
  }

  getProveedores(): Observable<Proveedor[]> {
    // return of(CLIENTES);
    return this.http.get<Proveedor[]>(this.urlEndPoint);
  }

  getId(): Observable<number> {
    return this.http.get(`${this.urlEndPoint}/id`).pipe(
      map((response: any) => response.identificador as number)
    );
  }

  create(proveedor: Proveedor, personaContacto: PersonaContacto[], cuentaBancaria: CuentaBancaria[], direccion: Direccion[]): Observable<any> {
    
    for(let i=0; i<direccion.length; i++) {
        if(direccion[i].pais === "Perú") {
            direccion[i].departamento = Region.instance(direccion[i].departamento).getName();
            direccion[i].provincia = Province.instance(direccion[i].provincia).getName();
            direccion[i].ubigeo = District.instance(direccion[i].distrito).getCode();
            direccion[i].distrito = District.instance(direccion[i].distrito).getName();
        }
    }

    return this.http.post(this.urlEndPoint, {proveedor, personaContacto, cuentaBancaria, direccion}, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.proveedor as Proveedor)
    );
  }

  getProveedor(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.urlEndPoint}/${id}`);
  }

  update(proveedor: Proveedor): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${proveedor.id}`, proveedor, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Proveedor> {
    return this.http.delete<Proveedor>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }

}
