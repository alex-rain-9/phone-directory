import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../shared.service";
import {TypeDepartmentNode, TypeEmployeeObj} from "../../models";

@Component({
  selector: 'app-department-output',
  templateUrl: './department-output.component.html',
  styleUrls: ['./department-output.component.scss']
})
export class DepartmentOutputComponent implements OnInit{
  constructor(public service:SharedService) {
  }

  departments:any = [];
  departmentsTree:TypeDepartmentNode[] = [];
  employees:any = [];

  ngOnInit() {
    this.getRootId();
    this.createDepartmentsTree();
    this.getEmployees();
  }

  //выставление root отдела при старте приложения
  getRootId() {
    const obs = this.service.getDepartments().subscribe((res) => {
      res.forEach((department:any) => {
        if (department['parentId'] === 'root') {
          this.service.setRootId(department.id);
          this.service.setSelectedDepartment(department.id);
          obs.unsubscribe();
        }
      });
    })
  }

  //создание дерева отделов
  createDepartmentsTree() {
    this.service.getDepartments().subscribe((res) => {
      this.departmentsTree = [];
      this.departments = res;

      this.departments.forEach((item:TypeDepartmentNode) => {
        if (item.parentId === 'root') {
          this.departmentsTree.push(item);
        } else {
          const parent = this.departments.find((i:TypeDepartmentNode) => {
            return i.id === item.parentId;
          });
          if (parent !== undefined) {
            if (!parent.children) {
              parent.children = [];
            }
            parent.children.push(item);
          }
        }
      })
      // триггер выбранных отделов на старте
      this.clickOnDepartment(this.service.selectedDepartment);
      // триггер search на старте
      this.service.pushSearch('');
    })
  }

  //Получекние сотрудников
  getEmployees() {
    this.service.getEmployees().subscribe((res) => {
      this.employees = res;
    })
  }

  //удаление отдела
  deleteDepartment(departmentId:string) {
    const department:TypeDepartmentNode = this.departments.find((i:TypeDepartmentNode) => i.id === departmentId);
    const departmentIds:string[] = this.collectIds(department);
    departmentIds.forEach((id:string) => {
      this.service.deleteDepartment(id);
    })
    if (departmentIds.includes(this.service.selectedDepartment)) {
      this.service.setSelectedDepartment(this.service.rootId);
    }
    this.employees.forEach((employee:TypeEmployeeObj) => {
      if (employee.departmentId === departmentId) {
        this.service.deleteEmployee(employee.id);
      }
    })
  }

  //установка выбранного отдела и подотделов
  clickOnDepartment(departmentId:string) {
    const selectedDepartment:TypeDepartmentNode = this.departments.find((i:TypeDepartmentNode) => i.id === departmentId);
    this.service.setSelectedDepartment(departmentId);
    this.service.pushDepartment(selectedDepartment);
    const departmentIds:string[] = this.collectIds(selectedDepartment);
    this.service.pushDepartmentFilter(departmentIds);
  }

  //создание массива id подотделов заданного отдела
  collectIds(department:TypeDepartmentNode, ids:string[] = []) {
    ids.push(department.id);

    if (department.children) {
      for (let child of department.children) {
        this.collectIds(child, ids);
      }
    }
    return ids;
  }
}
