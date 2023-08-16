import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentOutputComponent } from './department-output.component';

describe('DepartmentOutputComponent', () => {
  let component: DepartmentOutputComponent;
  let fixture: ComponentFixture<DepartmentOutputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentOutputComponent]
    });
    fixture = TestBed.createComponent(DepartmentOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
