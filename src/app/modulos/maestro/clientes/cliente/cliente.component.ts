import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl,Validators} from '@angular/forms';

export interface ClientesList {
  id: number;
  ruc_dni: number;
  razon_name: string;
};

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(
    
    public dialogRef: MatDialogRef<ClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientesList) { }


  ngOnInit(): void {
  }
  //EXPANSION DE DIRECCION Y DATOS PERSONALES
  panelOpenState = false;

  //EMAIL
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  //CERRAR REGISTRO
  onClose(): void {
    this.dialogRef.close();
  }


}
