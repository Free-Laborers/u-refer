import { useState, useEffect } from "react";
import { Box, Typography, IconButton, Pagination } from "@mui/material";
import useAxios from "axios-hooks";
import useJobFeedFilters from "../../contexts/JobFeedFilterContext";
import FilterDrawer from "./components/FilterDrawer";
import JobCard from "./components/JobCard";
import JobPreviewCard from "./components/JobPreviewCard";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
// @ts-ignore
import { JobPost } from "../../../../../backend/node_modules/prisma/prisma-client";

interface JobFeedResponseType {
  data: JobPost[];
  numResults: number;
}

export default function JobFeed () {
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
    maxExperience
  } = useJobFeedFilters();
  const [selectedSort, setselectedSort] = useState<sortStatus>(sortStatus.DEC);
  const [page, setPage] = useState(0);
  const [{ data }] = useAxios<JobFeedResponseType>({
    url: "/jobs",
    headers: {
      Authorization: localStorage.getItem("authorization")
    },
    params: {
      searchString,
      tags,
      minSalary,
      maxSalary,
      minExperience,
      maxExperience,
      page
    }
  });

  const numResults = data?.numResults || 0;
  const numPages = Math.ceil(numResults / PAGE_SIZE);
  const drawerWidth = 270;

  // sorts data ascending or descending by createdDate
  function handleChange () {
    if (selectedSort === sortStatus.ASC) {
      setselectedSort(sortStatus.DEC);
      data?.data?.sort((a, b) => a.createdDate.localeCompare(b.createdDate));
    } else {
      setselectedSort(sortStatus.ASC);
      data?.data?.sort((a, b) => b.createdDate.localeCompare(a.createdDate));
    }
  }
  // returns up or down button depending on selected sort
  function getIcon (order) {
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
        <Box sx={{ gridArea: "postList" }} overflow="auto">
          {data?.data?.map((job) => (
            <JobPreviewCard key={job?.id} onClick={() => setselectedJob(job)} job={job} />
          ))}
        </Box>
        <Box sx={{ gridArea: "postCard" }}>
          <JobCard job={selectedJob} />
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
