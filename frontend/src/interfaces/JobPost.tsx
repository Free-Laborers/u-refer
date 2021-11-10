export interface JobPost {
    id: string
    title: string
    position: string
    description: string
    minYearsExperience: number
    salary: number
    openings: number
    createdDate: Date
    deletedDate: Date | null
    hiringManagerId: string
  }