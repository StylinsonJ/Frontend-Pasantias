import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../services/contabilidad/ventas/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  
  constructor(public service: VentasService) { }

  departments = [
    { id: 1, value: 'Dep 1'},
    { id: 2, value: 'Dep 2'},
    { id: 3, value: 'Dep 3'}
  ];

  ngOnInit(): void {
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

}
