import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  navEnlaces = [
    { path: 'ventas-lista', label: 'Consulta'},
    { path: 'ventas-add', label: 'Nuevo Ingreso'},
  ];
  activeLink = this.navEnlaces[0];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
  }


}
