import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.css']
})
export class BancoComponent implements OnInit {

  constructor(    
    public dialogRef: MatDialogRef<BancoComponent>) { }

  ngOnInit(): void {
  }

  //CERRAR REGISTRO
  onClose(): void {
    this.dialogRef.close();
  }

  //CHECK RADIO
  estadoBanco!: string;
  estados: string[] = ['Activo', 'De baja'];

}
