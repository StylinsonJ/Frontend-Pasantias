import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablasGeneralesComponent } from './tablas-generales.component';

describe('TablasGeneralesComponent', () => {
  let component: TablasGeneralesComponent;
  let fixture: ComponentFixture<TablasGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablasGeneralesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablasGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
