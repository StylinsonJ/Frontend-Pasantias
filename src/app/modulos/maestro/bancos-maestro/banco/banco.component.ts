import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Banco } from 'src/app/intefaces/maestro/bancos.interface';
import { BancosMaestroService } from 'src/app/services/maestro/bancos-maestro.service';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.css']
})
export class BancoComponent implements OnInit{

  public banco: Banco = new Banco();

  constructor(    
    public dialogRef: MatDialogRef<BancoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Banco,
    public bancoService: BancosMaestroService) { }

  
  ngOnInit(): void {
    if(this.data != null) {
      this.loadBanco();
    }
  }

  //CERRAR REGISTRO
  onClose(): void {
    this.dialogRef.close();
  }

  //CHECK RADIO
  estadoBanco!: string;
  estados: string[] = ['Activo', 'De baja'];

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.bancoService.addItem(this.data);
  }

  loadBanco() {
    this.bancoService.getBanco(this.data.id).subscribe(
      data => {
        this.banco = data;
      }
    );
  }

}
