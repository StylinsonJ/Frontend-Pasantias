import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhAddComponent } from './rrhh-add.component';

describe('RrhhAddComponent', () => {
  let component: RrhhAddComponent;
  let fixture: ComponentFixture<RrhhAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrhhAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrhhAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
