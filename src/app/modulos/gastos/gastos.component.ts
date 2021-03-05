import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  navEnlaces = [
    { path: 'gastos-lista', label: 'Consulta'},
    { path: 'gastos-add', label: 'Nuevo Ingreso'},
  ];
  activeLink = this.navEnlaces[0];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

}
