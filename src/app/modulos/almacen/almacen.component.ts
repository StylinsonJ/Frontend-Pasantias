import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit {

  
  navEnlaces = [
    { path: 'entrada', label: 'Entradas'},
    { path: 'salida', label: 'Salidas'},
    { path: 'productos', label: 'Productos'},
    { path: 'consulta-stock', label: 'Consulta Stock'},
    { path: 'consulta-activos', label: 'Consulta Activos'},
    { path: 'orden-traslado', label: 'Orden de Traslado'},
   
  ];
  activeLink = this.navEnlaces[0];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

}
