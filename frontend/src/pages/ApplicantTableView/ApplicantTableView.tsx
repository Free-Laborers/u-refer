import { Box } from "@mui/material";
import TableView from "./TableView";
import PositionCard from "./PositionCard";
import {Link} from "react-router-dom";
import { JobPost } from "../../interfaces/JobPost"
import { Referral } from "../../interfaces/Referral"


interface ApplicantTableViewProps {
  jobPost: JobPost;
}

const ApplicantTableView = (props: ApplicantTableViewProps) => {
  const { jobPost } = props;


  const test_job = {
    title:"test title ", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    minYearsExperience: 2, 
    salary: 50000,
    id: "5050",
    position: "test_position",
    openings: 2,
    createdDate: new Date(),
    hiringManagerId: "1234" ,
    deletedDate: null
  }

  return (
    <>
      <Link to="/jobs"> Back </Link>
      <Box
        m={2}
        display="grid"
        height="100%"
        gridTemplateRows="auto 1fr auto"
        gridTemplateColumns="1fr 1fr"
        columnGap={2}
      >
        <Box>
            <PositionCard job={test_job} />
        </Box>
        <Box>
          <TableView jobPostID={test_job.id} referrals={[]}></TableView>
        </Box>
      </Box>
    </>
  );
};


export default ApplicantTableView;
