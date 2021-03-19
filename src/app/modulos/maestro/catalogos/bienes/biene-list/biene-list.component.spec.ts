import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BieneListComponent } from './biene-list.component';

describe('BieneListComponent', () => {
  let component: BieneListComponent;
  let fixture: ComponentFixture<BieneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BieneListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BieneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
