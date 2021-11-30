import { Box, Typography, IconButton, Pagination } from "@mui/material";
import useAxios from "axios-hooks";
import { useState, useEffect } from "react";
import useJobFeedFilters from "../../../contexts/JobFeedFilterContext";
import FilterDrawer from "../../JobFeed/components/FilterDrawer";
import JobPreviewCard from "../../JobFeed/components/JobPreviewCard";
import JobModal from "./JobModal";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
// @ts-ignore
import { JobPost } from "../../../../../backend/node_modules/prisma/prisma-client";
import axios from "axios";

interface JobFeedResponseType {
  data: JobPost[];
  numResults: number;
}

export default function JobFeed() {
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    position: "",
    isManager: "",
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

  enum sortStatus {
    ASC = "asc",
    DEC = "dec",
  }
  const PAGE_SIZE = 10;
  const [selectedJob, setselectedJob] = useState<any>(null);
  const {
    searchString,
    tags,
    minSalary,
    maxSalary,
    minExperience,
    maxExperience,
  } = useJobFeedFilters();
  const [selectedSort, setselectedSort] = useState<sortStatus>(sortStatus.DEC);
  const [page, setPage] = useState(0);
  const [{ data }] = useAxios<JobFeedResponseType>({
    url: "/jobPost/",
    headers: {
      Authorization: localStorage.getItem("authorization"),
    },
    params: {
      searchString,
      tags,
      minSalary,
      maxSalary,
      minExperience,
      maxExperience,
      page,
    },
  });

  const numResults = data?.numResults || 0;
  const numPages = Math.ceil(numResults / PAGE_SIZE);
  const drawerWidth = 270;

  //sorts data ascending or descending by createdDate
  function handleChange() {
    if (selectedSort === sortStatus.ASC) {
      setselectedSort(sortStatus.DEC);
      data?.data?.sort((a, b) => a.createdDate.localeCompare(b.createdDate));
    } else {
      setselectedSort(sortStatus.ASC);
      data?.data?.sort((a, b) => b.createdDate.localeCompare(a.createdDate));
    }
  }
  //returns up or down button depending on selected sort
  function getIcon(order) {
    if (order === sortStatus.ASC) return <ArrowDropUp />;
    return <ArrowDropDown />;
  }

  // Go to first page each time filters are changed. This prevents the user from remaining on a page where entries no longer exist
  useEffect(() => {
    setPage(0);
  }, [searchString, tags, minSalary, maxSalary, minExperience, maxExperience]);

  return (
    // 64px offset is to account for the navbar
    <Box height={"calc(100vh - 64px)"} sx={{ ml: `${drawerWidth}px` }}>
      <Box
        m={2}
        display="grid"
        height="100%"
        gridTemplateRows="auto 1fr auto"
        gridTemplateColumns="1fr 1fr"
        gridTemplateAreas={`"sort         .       "
                            "postList     postCard"
                            "pagination   .       "`}
        columnGap={2}
      >
        <Box sx={{ gridArea: "sort" }} my={1}>
          <Typography variant="button">{"Sort by Date: "}</Typography>
          <IconButton onClick={() => handleChange()}>
            {getIcon(selectedSort)}
          </IconButton>
          <Typography>{data?.numResults || 0} results</Typography>
        </Box>
        <Box
          sx={{ gridArea: "postList" }}
          overflow="auto"
          justifyContent="center"
          alignContent="center"
        >
          {data?.data?.map((job) => (
            <JobPreviewCard onClick={() => setselectedJob(job)} job={job} />
          ))}
        </Box>
        <Box mx="auto" my={2} sx={{ gridArea: "pagination" }}>
          <Pagination
            count={Math.floor(numPages)}
            page={page + 1}
            onChange={(e, page) => setPage(page - 1)}
          />
        </Box>
      </Box>
      <FilterDrawer width={drawerWidth} />
    </Box>
  );
}
