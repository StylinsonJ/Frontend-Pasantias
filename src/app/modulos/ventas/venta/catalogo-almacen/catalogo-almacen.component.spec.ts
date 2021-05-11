import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoAlmacenComponent } from './catalogo-almacen.component';

describe('CatalogoAlmacenComponent', () => {
  let component: CatalogoAlmacenComponent;
  let fixture: ComponentFixture<CatalogoAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoAlmacenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
