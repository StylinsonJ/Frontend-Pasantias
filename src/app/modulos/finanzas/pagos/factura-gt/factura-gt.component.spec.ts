import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaGtComponent } from './factura-gt.component';

describe('FacturaGtComponent', () => {
  let component: FacturaGtComponent;
  let fixture: ComponentFixture<FacturaGtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaGtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaGtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
