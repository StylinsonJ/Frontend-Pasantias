import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  navEnlaces = [
    { path: 'compras-lista', label: 'Consulta'},
    { path: 'compras-add', label: 'Nuevo Ingreso'},
  ];
  activeLink = this.navEnlaces[0];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

}
