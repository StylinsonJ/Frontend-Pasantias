import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flujo-servicios',
  templateUrl: './flujo-servicios.component.html',
  styleUrls: ['./flujo-servicios.component.css']
})
export class FlujoServiciosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
