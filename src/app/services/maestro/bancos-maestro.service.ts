import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Banco } from 'src/app/intefaces/maestro/bancos.interface';

@Injectable()
export class BancosMaestroService {

  private readonly API_URL = 'http://localhost:8082/api/bancos';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  dataChange: BehaviorSubject<Banco[]> = new BehaviorSubject<Banco[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {}

  get data(): Banco[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllBancos(): void {
    this.httpClient.get<Banco[]>(`${this.API_URL}/all`).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  getBanco(id: number): Observable<Banco> {
    return this.httpClient.get<Banco>(`${this.API_URL}/${id}`);
  }

  addItem(banco: Banco): void {
    this.httpClient.post(this.API_URL, banco, {headers: this.httpHeaders}).pipe(
      map((response: any) => response as Banco)
    );
  }

  updateItem(banco: Banco): void {
    this.httpClient.put(`${this.API_URL}/${banco.id}`, banco, {headers: this.httpHeaders}).subscribe(data => {
        this.dialogData = data;
        console.log(data);
        console.log('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
}
