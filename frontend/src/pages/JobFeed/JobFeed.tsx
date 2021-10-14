import { Box } from '@mui/material'
import useAxios from 'axios-hooks'
import { useState } from 'react'
import FilterDrawer from './components/FilterDrawer'
import JobCard from './components/JobCard'
import JobPreviewCard from './components/JobPreviewCard'
// import { JobPost } from '../../../../backend/node_modules/prisma/prisma-client'

export default function JobFeed() {
  const [{ data, loading, error }, refetch] = useAxios('http://localhost:5000/jobs')
  const [selectedJob, setselectedJob] = useState<any>(null)
  const drawerWidth = 270
  return (
    <Box height={'calc(100vh - 64px)'} sx={{ ml: `${drawerWidth}px` }}>
      <FilterDrawer width={drawerWidth} />
      <Box p={3} display='flex' flexDirection='column' height='100%'>
        <Box height='100%' display='flex'>
          <Box overflow='auto'>
            {data && data.map(job => <JobPreviewCard job={job} />)}
          </Box>
          <JobCard job={selectedJob} />
        </Box>
      </Box>
    </Box>
  )
}
