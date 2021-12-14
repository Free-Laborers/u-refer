import useAxios from "axios-hooks";
import { Redirect, useHistory } from "react-router";
import useAuth from "../../hooks/useAuth";
import JobPost from "../../interfaces/JobPost";
import ApplicantTableView from "./ApplicantTableView";

export default function JobPostPage({ jobPostId }: { jobPostId: string }) {
    const { user } = useAuth();
    const history = useHistory();
    const [{ data }] = useAxios<JobPost>({
        url: "/jobPost/" + jobPostId,
        headers: {
            Authorization: localStorage.getItem("authorization"),
        },
    });

    if (data && user) {
        if (data.hiringManagerId != user.id) {
            return <Redirect to='/jobs' />
        } else {
            return <ApplicantTableView jobPost={data} />
        }
    }

    return <></>
}