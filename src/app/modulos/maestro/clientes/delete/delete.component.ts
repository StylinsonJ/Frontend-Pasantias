import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesService } from 'src/app/services/maestro/clientes.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent{

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public clienteService: ClientesService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.clienteService.deleteCliente(this.data.id);
  }
}
