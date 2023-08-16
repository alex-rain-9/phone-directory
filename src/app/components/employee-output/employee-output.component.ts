import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../shared.service";
import {combineLatest} from "rxjs";
import {TypeEmployeeObj} from "../../models";

@Component({
  selector: 'app-employee-output',
  templateUrl: './employee-output.component.html',
  styleUrls: ['./employee-output.component.scss']
})
export class EmployeeOutputComponent implements OnInit{

  constructor(public service:SharedService) {
  }

  employees:any = [];
  departments:any = [];

  ngOnInit() {
    this.getDepartments();
    this.filterEmployees();
  }

  //фильтр списка сотрудников
  filterEmployees() {
    combineLatest([
      this.service.getEmployees(),
      this.service.departmentsFilterTransferObservable,
      this.service.searchTransferObservable
    ]).subscribe(([employees, departments, searchString]) => {
      this.employees = [];
      employees.forEach((employee:any) => {
        if (departments.includes(employee.departmentId)) {
          const employeeValues:any[] = Object.values(employee);
          for (let value of employeeValues) {
            if (value.toLowerCase().includes(searchString)) {
              this.employees.push(employee);
              break
            }
          }
        }
      })
    })
  }

  //получение отделов
  getDepartments() {
    this.service.getDepartments().subscribe((res) => {
      this.departments = res;
    })
  }

  //удаление сотрудника
  deleteEmployee(employeeId:string) {
    this.service.deleteEmployee(employeeId);
  }

  //установка выделенного сотрудника
  clickOnEmployee(employeeId:string) {
    this.service.setSelectedEmployee(employeeId)
    this.service.pushEmployee(this.employees.find((i:any) => i.id === employeeId));
  }

  //получение название отдела по id для верстки
  getDepartmentNameById(id:string) {
    let department = this.departments.find((i:any) => i.id === id);
    return department.name;
  }

  //поиск
  search(e:KeyboardEvent) {
    const value:string = (e.target as HTMLInputElement).value;
    this.service.pushSearch(value.toLowerCase());
  }
}
