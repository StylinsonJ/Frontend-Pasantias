import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancosMaestroComponent } from './bancos-maestro.component';

describe('BancosMaestroComponent', () => {
  let component: BancosMaestroComponent;
  let fixture: ComponentFixture<BancosMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancosMaestroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BancosMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
