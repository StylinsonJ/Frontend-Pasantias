import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ProductoComponent>,) { }

  ngOnInit(): void {
  }

  //CERRAR REGISTRO
  onClose(): void {
    this.dialogRef.close();
  }
}
