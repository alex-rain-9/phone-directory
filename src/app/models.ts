export type TypeEmployeeObj = {
  id:string;
  departmentId: string;
  name: string;
  surname:string;
  patronymic:string;
  jobTitle:string;
  phone:string;
  address:string;
  email:string;
}

export type TypeDepartmentNode = {
  id: string;
  name: string;
  parentId: string;
  children?: TypeDepartmentNode[];
}
