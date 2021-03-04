import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaOrgComponent } from './consulta-org.component';

describe('ConsultaOrgComponent', () => {
  let component: ConsultaOrgComponent;
  let fixture: ComponentFixture<ConsultaOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
