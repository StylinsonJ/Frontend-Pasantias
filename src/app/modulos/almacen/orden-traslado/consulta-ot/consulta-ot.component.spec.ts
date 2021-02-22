import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaOtComponent } from './consulta-ot.component';

describe('ConsultaOtComponent', () => {
  let component: ConsultaOtComponent;
  let fixture: ComponentFixture<ConsultaOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaOtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
