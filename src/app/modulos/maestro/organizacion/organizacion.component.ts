import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.css']
})
export class OrganizacionComponent implements OnInit {

  typesOfShoes: string[] = ['Nueva Unidad', 'Nueva Area', 'Consultas'];

  constructor() { }

  ngOnInit(): void {
  }

}
