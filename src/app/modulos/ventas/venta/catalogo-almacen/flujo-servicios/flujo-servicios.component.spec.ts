import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoServiciosComponent } from './flujo-servicios.component';

describe('FlujoServiciosComponent', () => {
  let component: FlujoServiciosComponent;
  let fixture: ComponentFixture<FlujoServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlujoServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlujoServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
