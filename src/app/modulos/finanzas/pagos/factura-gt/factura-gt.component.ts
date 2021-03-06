import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factura-gt',
  templateUrl: './factura-gt.component.html',
  styleUrls: ['./factura-gt.component.css']
})
export class FacturaGtComponent implements OnInit {

  isLinear = false;
  secondFormGroup!: FormGroup;
  isOptional = false;

  constructor(
    public  dialogRef: MatDialogRef<FacturaGtComponent>,
    private router: Router,
    private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

   //---------------------Cerrar dialogo
   onClose(): void {
    //this.proveedorService.form.reset();
    //this.proveedorService.initializeFormGroup();
    this.dialogRef.close();
    this.router.navigate(['/finanzas/pagos'])
  }

}
