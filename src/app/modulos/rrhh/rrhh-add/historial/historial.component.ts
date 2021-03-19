import { Component, OnInit } from '@angular/core';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  folders: Section[] = [
    {
      name: 'Jefe de Almacen',
      updated: new Date('1/28/20'),
    },
    {
      name: 'Jefe de Transporte',
      updated: new Date('1/17/18'),
    },
    {
      name: 'Chofer',
      updated: new Date('1/1/16'),
    }
  ];
}
