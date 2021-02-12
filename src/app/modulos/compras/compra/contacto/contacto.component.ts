import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl,Validators} from '@angular/forms';

export interface NuevoContacto {
  id: number;
  nombre: string;
  cargo: string;
  telefono: number;
  correo: string;
};

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ContactoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NuevoContacto) { }

  ngOnInit(): void {
  }

   //EMAIL
   email = new FormControl('', [Validators.required, Validators.email]);

   getErrorMessage() {
     if (this.email.hasError('required')) {
       return 'You must enter a value';
     }
 
     return this.email.hasError('email') ? 'Not a valid email' : '';
   }

   //CERRAR CONTACTO
   onClose(): void {
    this.dialogRef.close();
  }

}
