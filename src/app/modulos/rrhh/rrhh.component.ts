import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rrhh',
  templateUrl: './rrhh.component.html',
  styleUrls: ['./rrhh.component.css']
})
export class RrhhComponent implements OnInit {

  navEnlaces = [
    { path: 'dashboard-rrhh', label: 'Dashboard'},
    { path: 'rrhh-lista', label: 'Consulta'},
    { path: 'rrhh-add', label: 'Nuevo Ingreso'},
  ];
  activeLink = this.navEnlaces[0];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
}
