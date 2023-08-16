import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOutputComponent } from './employee-output.component';

describe('ContactOutputComponent', () => {
  let component: EmployeeOutputComponent;
  let fixture: ComponentFixture<EmployeeOutputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeOutputComponent]
    });
    fixture = TestBed.createComponent(EmployeeOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
