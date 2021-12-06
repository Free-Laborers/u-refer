import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import TableView from "./TableView";
import PositionCard from "./PositionCard";
import {Link} from "react-router-dom";
//import { JobPost } from "../../../../backend/node_modules/prisma/prisma-client";

/*
interface ApplicantTableViewProps {
  job: JobPost;
}
*/
const ApplicantTableView = () => {
  //const { job } = props;


  const test_job = {title:"test title ", description: "test description ",
  experience: "2", salary : "50,000"}

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
          <TableView jobPostID={""} referrals={[]}></TableView>
        </Box>
      </Box>
    </>
  );
};


export default ApplicantTableView;
