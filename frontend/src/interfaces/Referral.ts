

// TODO: check that this is actually
// what is output by the backend.
export default interface Referral {
    id: string;
    employeeId: string;
    candidateId: string;
    jobPostId: string;
    description: string;
    resumeFilePath: string | null;
    createdDate: string;
    contactedDate: string | null;
    finishedDate: string | null;
    status: string; // make sure we send as a string
    Candidate: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        pronoun: string | null;
        phone: string | null;
        employeeId: string | null;
    };
}

export const Referall_status = {
    SUBMITTED: "SUBMITTED", // the referee info has been submitted, but not reviewed by managers yet
    REVIEWED: "REVIEWED",  // the referee info has been reviewed, and the managers are deciding if they want to contact to the candidate or not
    CONTACTED: "CONTACTED", // the referee has been contacted, but has not been rejected or hired yet
    REJECTED: "REJECTED",  // the referee has been rejected after being reviewed or contacted
    HIRED: "HIRED",     // the referee has been hired, after being reviewed and contacted
    WITHDRAWN: "WITHDRAWN", // the referee has been withdrawn by the referrer while it was SUBMITTED
    IGNORED: "IGNORED",   // the referee has been ignored without any review with any hiring managers (due to job close for example)
}