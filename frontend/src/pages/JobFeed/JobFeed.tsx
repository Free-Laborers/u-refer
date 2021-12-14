import { Box, Typography, IconButton, Pagination } from "@mui/material";
import useAxios from "axios-hooks";
import { useState, useEffect } from "react";
import useJobFeedFilters from "../../contexts/JobFeedFilterContext";
import FilterDrawer from "./components/FilterDrawer";
import JobCard from "./components/JobCard";
import JobPreviewCard from "./components/JobPreviewCard";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { JobPostAndTags } from "../../interfaces/JobPost"

interface JobFeedResponseType {
  data: JobPostAndTags[];
  numResults: number;
}

export default function JobFeed() {
  enum sortStatus {
    ASC = "asc",
    DEC = "desc",
  }
  const PAGE_SIZE = 10;
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const {
    searchString,
    tags,
    minSalary,
    maxSalary,
    minExperience,
    maxExperience,
    myJobs,
  } = useJobFeedFilters();
  const [selectedSort, setSelectedSort] = useState<sortStatus>(sortStatus.DEC);
  const [page, setPage] = useState(0);
  const [{ data }] = useAxios<JobFeedResponseType>({
    url: "/jobPost",
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
      myJobs,
      sortBy: "createdDate",
      sortDirection: selectedSort,
    },
  });

  const numResults = data?.numResults || 0;
  const numPages = Math.ceil(numResults / PAGE_SIZE);
  const drawerWidth = 270;

  //sorts data ascending or descending by createdDate
  function reverseSort() {
    if (selectedSort === sortStatus.ASC) {
      setSelectedSort(sortStatus.DEC);
    } else {
      setSelectedSort(sortStatus.ASC);
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
  }, [
    searchString,
    tags,
    minSalary,
    maxSalary,
    minExperience,
    maxExperience,
    myJobs,
  ]);

  useEffect(() => {
    if (!selectedJob && data && data?.data?.length > 0) {
      setSelectedJob(data?.data[0]);
      setPage(0);
    }
  }, [data, selectedJob]);

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
          <IconButton onClick={reverseSort}>{getIcon(selectedSort)}</IconButton>
          <Typography>{data?.numResults || 0} results</Typography>
        </Box>
        <Box sx={{ gridArea: "postList" }} overflow="auto">
          {data?.data?.map((job) => (
            <JobPreviewCard onClick={() => setSelectedJob(job)} job={job} key={job.id} />
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
