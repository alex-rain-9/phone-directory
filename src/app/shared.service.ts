import {Injectable} from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  deleteDoc,
  updateDoc
} from "@angular/fire/firestore";
import {Subject} from "rxjs";
import {TypeDepartmentNode, TypeEmployeeObj} from "./models";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private fs: Firestore) { }

  rootId:string = '';
  selectedDepartment:string = '';
  selectedEmployee:string = '';

  departmentsFilterTransferSubject = new Subject<string[]>();
  departmentsFilterTransferObservable = this.departmentsFilterTransferSubject.asObservable();

  departmentTransferSubject = new Subject<TypeDepartmentNode>();
  departmentTransferObservable = this.departmentTransferSubject.asObservable();
  employeeTransferSubject = new Subject<TypeEmployeeObj>();
  employeeTransferObservable = this. employeeTransferSubject.asObservable();

  searchTransferSubject = new Subject<string>();
  searchTransferObservable = this.searchTransferSubject.asObservable();

  setRootId(id:string) {
    this.rootId = id;
  }

  setSelectedEmployee(employeeId:string) {
    this.selectedEmployee = employeeId;
  }

  setSelectedDepartment(departmentId:string) {
    this.selectedDepartment = departmentId;
  }

  pushEmployee(employee: TypeEmployeeObj) {
    this.employeeTransferSubject.next(employee);
  }

  pushDepartment(department: TypeDepartmentNode) {
    this.departmentTransferSubject.next(department);
  }

  pushDepartmentFilter(departments: string[]) {
    this.departmentsFilterTransferSubject.next(departments);
  }

  pushSearch(search:string) {
    this.searchTransferSubject.next(search);
  }

  getEmployees() {
    const employees = collection(this.fs, 'employees');
    return collectionData(employees, {idField: 'id'})
  }

  addEmployee(data:any) {
    const employee = collection(this.fs, 'employees');
    return addDoc(employee, data)
  }

  updateEmployee(id:string, data:any) {
    const employee = doc(this.fs, "employees", id)
    return updateDoc(employee, data)
  }

  deleteEmployee(employeeId:string) {
    const docRef = doc(this.fs, 'employees/' + employeeId)
    return deleteDoc(docRef)
  }

  getDepartments() {
    const departments = collection(this.fs, 'departments');
    return collectionData(departments, {idField: 'id'})
  }

  addDepartment(name:any, parentId:string) {
    const data = {
      name: name,
      parentId: parentId
    }
    let department = collection(this.fs, 'departments');
    return addDoc(department, data)
  }

  updateDepartment(id:string, name:any) {
    const department = doc(this.fs, "departments", id)
    const data = {
      name: name
    };
    return updateDoc(department, data)
  }

  deleteDepartment(departmentId:string) {
    const docRef = doc(this.fs, 'departments/' + departmentId)
    return deleteDoc(docRef)
  }
}
