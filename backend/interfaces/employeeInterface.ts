export interface EmployeeWhereClause {
  id?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  pronoun?: string;
  position?: string;
  createDate?: Date;
  isManager?: boolean;
}

export interface EmployeeDataClause {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  pronoun?: string;
  position: string;
  createDate?: Date;
  isManager: boolean;
}
