import { Referral_Status } from "./Referral_Status";

export interface Referral {
    id: string
    employeeId: string
    candidateId: string
    jobPostId: string
    description: string
    resumeFilePath: string | null
    createdDate: Date
    contactedDate: Date | null
    finishedDate: Date | null
    status: Referral_Status
    deletedDate: Date | null
  }