import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVentaComponent } from './tipo-venta.component';

describe('TipoVentaComponent', () => {
  let component: TipoVentaComponent;
  let fixture: ComponentFixture<TipoVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
