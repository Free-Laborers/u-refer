import { Box } from '@mui/material'
import useAxios from 'axios-hooks'
import { useState } from 'react'
import useJobFeedFilters from '../../contexts/JobFeedFilterContext'
import FilterDrawer from './components/FilterDrawer'
import JobCard from './components/JobCard'
import JobPreviewCard from './components/JobPreviewCard'

export default function JobFeed() {
  const [selectedJob, setselectedJob] = useState<any>(null)
  const { searchString, tags, minSalary, maxSalary } = useJobFeedFilters()
  const [{ data, loading, error }, refetch] = useAxios({
    url: 'http://localhost:5000/jobs',
    params: { 
      searchString,
      tags,
      minSalary,
      maxSalary
    }
  })
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
