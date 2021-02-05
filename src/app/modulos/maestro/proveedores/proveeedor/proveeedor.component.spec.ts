import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveeedorComponent } from './proveeedor.component';

describe('ProveeedorComponent', () => {
  let component: ProveeedorComponent;
  let fixture: ComponentFixture<ProveeedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveeedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveeedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
