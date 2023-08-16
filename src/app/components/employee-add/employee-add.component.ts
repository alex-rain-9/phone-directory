import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})

export class EmployeeAddComponent implements OnInit{

  constructor(public service:SharedService) {
  }

  ngOnInit() {
    this.applyEmployee();
  }

  //форма добавления сотрудника
  addEmployeeForm = new FormGroup({
    surname: new FormControl(null, {validators:[Validators.required]}),
    name: new FormControl(null, {validators:[Validators.required]}),
    patronymic: new FormControl(null, {validators:[Validators.required]}),
    jobTitle: new FormControl(null, {validators:[Validators.required]}),
    phone: new FormControl(null, {validators:[]}),
    address: new FormControl(null, {validators:[]}),
    email: new FormControl(null, {validators:[]}),
  });

  //выставление значений выделенного сотрудника в форму
  applyEmployee() {
    this.service.employeeTransferObservable.subscribe((res:any) => {
      this.addEmployeeForm.controls.surname.setValue(res.surname);
      this.addEmployeeForm.controls.name.setValue(res.name);
      this.addEmployeeForm.controls.patronymic.setValue(res.patronymic);
      this.addEmployeeForm.controls.jobTitle.setValue(res.jobTitle);
      this.addEmployeeForm.controls.phone.setValue(res.phone);
      this.addEmployeeForm.controls.address.setValue(res.address);
      this.addEmployeeForm.controls.email.setValue(res.email);
    })
  }

  getEmployeeFormData() {
    return {
      departmentId: this.service.selectedDepartment,
      name: this.addEmployeeForm.value.name,
      surname: this.addEmployeeForm.value.surname,
      patronymic: this.addEmployeeForm.value.patronymic,
      jobTitle: this.addEmployeeForm.value.jobTitle,
      phone: this.addEmployeeForm.value.phone,
      address: this.addEmployeeForm.value.address,
      email: this.addEmployeeForm.value.email
    }
  }

  //обновление данных сотрудника
  updateEmployee() {
    const data = this.getEmployeeFormData()
    this.service.updateEmployee(this.service.selectedEmployee, data);
  }

  //создание сотрудника
  addEmployee(): void {
    const data = this.getEmployeeFormData()
    this.service.addEmployee(data);
    this.addEmployeeForm.reset();
  }

}
