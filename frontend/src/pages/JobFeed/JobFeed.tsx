import { Box } from '@mui/material'
import axios from 'axios'
import useAxios from 'axios-hooks'
import { useState } from 'react'
import { Redirect } from 'react-router'
import useJobFeedFilters from '../../contexts/JobFeedFilterContext'
import FilterDrawer from './components/FilterDrawer'
import JobCard from './components/JobCard'
import JobPreviewCard from './components/JobPreviewCard'

export default function JobFeed() {
  const [selectedJob, setselectedJob] = useState<any>(null)
  const { searchString, tags, minSalary, maxSalary, minExperience, maxExperience } = useJobFeedFilters()
  const [{ data, loading, error }, refetch] = useAxios({
    url: 'http://localhost:5000/jobPost',
    params: { 
      searchString,
      tags,
      minSalary,
      maxSalary,
      minExperience,
      maxExperience
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("authorization")
    }
  })
  const drawerWidth = 270

  if (!(localStorage.getItem("authorization"))) {
    return <Redirect to="/login" />
  }  
  return (
    // 64px offset is to account for the navbar
    <Box height={'calc(100vh - 64px)'} sx={{ ml: `${drawerWidth}px` }}>
      <FilterDrawer width={drawerWidth} />
      <Box p={3} display='flex' flexDirection='column' height='100%'>
        <Box height='100%' display='grid' gridTemplateColumns='1fr 1fr'>
          <Box overflow='auto'>
            {data && data.map(job => <JobPreviewCard key = {job.id} onClick={() => setselectedJob(job)} job={job} />)}
          </Box>
          <JobCard job={selectedJob} />
        </Box>
      </Box>
    </Box>
  )
}
