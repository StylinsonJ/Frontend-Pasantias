import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-factura-gt',
  templateUrl: './factura-gt.component.html',
  styleUrls: ['./factura-gt.component.css']
})
export class FacturaGtComponent implements OnInit {

  isLinear = false;
  secondFormGroup!: FormGroup;
  isOptional = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
