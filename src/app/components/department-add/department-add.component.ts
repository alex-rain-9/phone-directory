import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../shared.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TypeDepartmentNode} from "../../models";

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent implements OnInit{

  constructor(public service:SharedService) {
  }

  ngOnInit() {
    //выставление значения выделенного отдела в форму
    this.service.departmentTransferObservable.subscribe((res:TypeDepartmentNode) => {
      this.addDepartmentForm.controls.name.setValue(res.name);
    })
  }

  //форма добавления отдела
  addDepartmentForm = new FormGroup({
    name: new FormControl('', {validators:[Validators.required]})
  });

  //создание отдела
  addDepartment() {
    let name = this.addDepartmentForm.value.name;
    let parentId = this.service.selectedDepartment;
    this.service.addDepartment(name, parentId);
    this.addDepartmentForm.reset();
  }

  //обновление данных отдела
  updateDepartment() {
    let name = this.addDepartmentForm.value.name;
    this.service.updateDepartment(this.service.selectedDepartment, name);
  }

}
