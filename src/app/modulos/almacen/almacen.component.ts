import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit {

  
  navEnlaces = [
    { path: 'entrada', label: 'Entrada'},
    { path: 'salida', label: 'Salida'},
    { path: 'productos', label: 'Productos'},
    { path: 'stock-lista', label: 'Stock'},
  ];
  activeLink = this.navEnlaces[0];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

}
