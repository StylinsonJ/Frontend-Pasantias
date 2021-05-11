import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoBienesComponent } from './flujo-bienes.component';

describe('FlujoBienesComponent', () => {
  let component: FlujoBienesComponent;
  let fixture: ComponentFixture<FlujoBienesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlujoBienesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlujoBienesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
