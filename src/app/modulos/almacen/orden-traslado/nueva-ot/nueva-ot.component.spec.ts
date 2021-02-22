import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaOtComponent } from './nueva-ot.component';

describe('NuevaOtComponent', () => {
  let component: NuevaOtComponent;
  let fixture: ComponentFixture<NuevaOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaOtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
