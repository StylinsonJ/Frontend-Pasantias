import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancosFinanzasComponent } from './bancos-finanzas.component';

describe('BancosFinanzasComponent', () => {
  let component: BancosFinanzasComponent;
  let fixture: ComponentFixture<BancosFinanzasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancosFinanzasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BancosFinanzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
