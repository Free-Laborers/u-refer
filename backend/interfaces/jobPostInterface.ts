export interface JobPostInsert {
  id?: string;
  title: string;
  position: string;
  description: string;
  minYearsExperience: number;
  salary: number;
  openings?: number;
  createdDate?: Date;
  deletedDate?: Date;
  hiringManagerId: string;
  PostToTag?: object;
}
