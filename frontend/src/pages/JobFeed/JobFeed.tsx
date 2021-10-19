import { Box } from '@mui/material'
import axios from 'axios'
import useAxios from 'axios-hooks'
import { useState } from 'react'
import FilterDrawer from './components/FilterDrawer'
import JobCard from './components/JobCard'
import JobPreviewCard from './components/JobPreviewCard'
// import { JobPost } from '../../../../backend/node_modules/prisma/prisma-client'

export default function JobFeed() {
  const [{ data, loading, error }, refetch] = useAxios({
    url: 'http://localhost:5000/jobPost',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("authorization")
    }
  })
  const [selectedJob, setselectedJob] = useState<any>(null)
  const drawerWidth = 270
  
  return (
    // 64px offset is to account for the navbar
    <Box height={'calc(100vh - 64px)'} sx={{ ml: `${drawerWidth}px` }}>
      <FilterDrawer width={drawerWidth} />
      <Box p={3} display='flex' flexDirection='column' height='100%'>
        <Box height='100%' display='grid' gridTemplateColumns='1fr 1fr'>
          <Box overflow='auto'>
            {data && data.map(job => <JobPreviewCard onClick={() => setselectedJob(job)} job={job} />)}
          </Box>
          <JobCard job={selectedJob} />
        </Box>
      </Box>
    </Box>
  )
}
