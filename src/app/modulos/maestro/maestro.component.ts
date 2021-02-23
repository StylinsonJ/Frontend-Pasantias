import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.css']
})
export class MaestroComponent implements OnInit {
  navLinks = [
    { path: 'proveedores', label: 'Proveedores'},
    { path: 'clientes', label: 'Clientes' },
    { path: 'bancos', label: 'Bancos' },
    { path: 'catalogos', label: 'Catálogos' },
    { path: 'organizacion', label: 'Organización' },
    { path: 'tablas-generales', label: 'Tablas Generales' },
  ];
  activeLink = this.navLinks[0];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
  }


}
