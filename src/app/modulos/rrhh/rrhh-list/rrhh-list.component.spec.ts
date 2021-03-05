import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhListComponent } from './rrhh-list.component';

describe('RrhhListComponent', () => {
  let component: RrhhListComponent;
  let fixture: ComponentFixture<RrhhListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrhhListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrhhListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
