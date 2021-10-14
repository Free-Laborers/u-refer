export interface EmployeeInsert {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  pronoun?: string;
  position: string;
  createdDate?: Date;
  isManager?: boolean;
}
