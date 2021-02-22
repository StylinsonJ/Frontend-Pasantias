import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BieneComponent } from './biene.component';

describe('BieneComponent', () => {
  let component: BieneComponent;
  let fixture: ComponentFixture<BieneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BieneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BieneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
