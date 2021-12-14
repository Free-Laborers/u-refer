import { Box } from "@mui/material";
import TableView from "./TableView";
import PositionCard from "./PositionCard";
import { Link } from "react-router-dom";
import JobPost from "../../interfaces/JobPost"
import { Referral } from "../../interfaces/Referral"

const ApplicantTableView = ({ jobPost }: { jobPost: JobPost }) => {

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
          <PositionCard job={jobPost} />
        </Box>
        <Box>
          <TableView jobPostID={jobPost.id} referrals={[]}></TableView>
        </Box>
      </Box>
    </>
  );
};


export default ApplicantTableView;
