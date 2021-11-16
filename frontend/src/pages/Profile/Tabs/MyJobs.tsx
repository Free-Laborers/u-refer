import { useEffect, useState } from "react";
import axios from "axios";
//@ts-ignore
import { JobPost } from "../../../../../backend/node_modules/prisma/prisma-client";
import useAxios from "axios-hooks";
import { Typography } from "@mui/material";
import TableView from "../components/TableView"

interface JobFeedResponseType {
  data: JobPost[];
}

export default function MyJobs(props) {
  const [selectedJob, setselectedJob] = useState<any>(null);
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    position: "",
    isManager: "",
  });

  const [{ data }] = useAxios<JobFeedResponseType>({
    url: "/jobPost/manager",
    headers: {
      Authorization: localStorage.getItem("authorization"),
    },
  });

  useEffect(() => {
    async function getData() {
      const auth = localStorage.getItem("authorization");

      if (auth) {
        try {
          const response = await axios("/employee/profile", {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("authorization"),
            },
          });
          const json = await response.data;
          return setUserData(json.user);
        } catch (err) {
          console.error(err);
        }
      }
    }

    getData();
  }, []);
  return (
    <>
      <Typography>This is where {userData.firstName} {userData.lastName}'s jobs will go</Typography>
      <Typography>{userData.id}</Typography>
      <Typography>{JSON.stringify(data)}</Typography>
    </>
  );
}
