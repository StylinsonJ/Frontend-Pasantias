import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonaContacto } from 'src/app/componentes/maestro/persona-contacto';

@Injectable({
  providedIn: 'root'
})
export class PersonaContactoService {

  private urlEndPoint: string = 'http://localhost:8082/api/persona-contacto';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getPersonaContactos(): Observable<PersonaContacto[]> {
    return this.http.get<PersonaContacto[]>(this.urlEndPoint);
  }

  create(personaContacto: PersonaContacto): Observable<PersonaContacto> {
    return this.http.post(this.urlEndPoint, personaContacto, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.personaContacto as PersonaContacto)
    );
  }

  getPersonaContacto(id: number): Observable<PersonaContacto> {
    return this.http.get<PersonaContacto>(`${this.urlEndPoint}/${id}`);
  }

  update(personaContacto: PersonaContacto): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${personaContacto.id}`, personaContacto, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<PersonaContacto> {
    return this.http.delete<PersonaContacto>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
