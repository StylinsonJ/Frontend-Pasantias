import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaActivosComponent } from './consulta-activos.component';

describe('ConsultaActivosComponent', () => {
  let component: ConsultaActivosComponent;
  let fixture: ComponentFixture<ConsultaActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaActivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
