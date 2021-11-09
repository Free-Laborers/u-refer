import { Box, Typography, IconButton } from '@mui/material'
import useAxios from 'axios-hooks'
import { useState } from 'react'
import useJobFeedFilters from '../../contexts/JobFeedFilterContext'
import FilterDrawer from './components/FilterDrawer'
import JobCard from './components/JobCard'
import JobPreviewCard from './components/JobPreviewCard'
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material'

export default function JobFeed() {
  enum sortStatus{
    ASC = 'asc',
    DEC = 'dec'
  }
  const [selectedJob, setselectedJob] = useState<any>(null)
  const { searchString, tags, minSalary, maxSalary, minExperience, maxExperience } = useJobFeedFilters()
  const [selectedSort, setselectedSort] = useState<sortStatus>(sortStatus.DEC) 
  const [{ data }] = useAxios({
    url: 'http://localhost:5000/jobs',
    headers: { 
      'Authorization': localStorage.getItem('authorization')
    },
    params: { 
      searchString,
      tags,
      minSalary,
      maxSalary,
      minExperience,
      maxExperience
    },
  })
  const drawerWidth = 270

  //sorts data ascending or descending by createdDate 
  function handleChange(){
    if (selectedSort === sortStatus.ASC){
      setselectedSort(sortStatus.DEC)
      data.sort((a,b) => a.createdDate.localeCompare(b.createdDate))
    } 
    else{
      setselectedSort(sortStatus.ASC)
      data.sort((a,b) => b.createdDate.localeCompare(a.createdDate))
    } 
  }
  //returns up or down button depending on selected sort
  function getIcon(order){
      if (order === sortStatus.ASC) return <ArrowDropUp/>
      return <ArrowDropDown/>
  }
  
  return (
    // 64px offset is to account for the navbar
    <Box height={'calc(100vh - 64px)'} sx={{ ml: `${drawerWidth}px` }}>
      <FilterDrawer width={drawerWidth} />
      <Box p={3} display='flex' flexDirection='column' height='100%'>
        <Box>
            <Typography variant='button'>
                {"Sort by Date: "}
            </Typography>
            <IconButton onClick={() => handleChange()}>
                {getIcon(selectedSort)}
            </IconButton>
        </Box>
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
