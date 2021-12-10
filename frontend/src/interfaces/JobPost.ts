
export default interface JobPost {
    id: string;
    title: string;
    position: string;
    description: string;
    minYearsExperience: number;
    salary: number;
    openings: number;
    createdDate: string;
    deletedDate: string | null;
    hiringManagerId: string;
    PostToTag: string[];
}