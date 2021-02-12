import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { MAESTRO, ALMACEN, GASTOS, VENTAS, COMPRAS, FINANZAS} from './iconos/icon';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  //MENU-SIDENAV

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  isShowing = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private tokenService: TokenStorageService,
    private iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer
    ) { 

      iconRegistry.addSvgIconLiteral('almacen_icon', sanitizer.bypassSecurityTrustHtml(ALMACEN));
      iconRegistry.addSvgIconLiteral('maestro_icon', sanitizer.bypassSecurityTrustHtml(MAESTRO));
      iconRegistry.addSvgIconLiteral('gastos_icon', sanitizer.bypassSecurityTrustHtml(GASTOS));
      iconRegistry.addSvgIconLiteral('ventas_icon', sanitizer.bypassSecurityTrustHtml(VENTAS));
      iconRegistry.addSvgIconLiteral('compras_icon', sanitizer.bypassSecurityTrustHtml(COMPRAS));
      iconRegistry.addSvgIconLiteral('finanzas_icon', sanitizer.bypassSecurityTrustHtml(FINANZAS));
      
    }

 //CERRAR SESION
  isLogged = false;
  ngOnInit(): void {
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    }else {
      this.isLogged = false;
    };

  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
  
}


 
