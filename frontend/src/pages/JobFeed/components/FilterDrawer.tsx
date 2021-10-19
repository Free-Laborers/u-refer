import { Drawer, Slider, TextField, Typography, Box } from '@mui/material'
import useJobFeedFilters from '../../../contexts/JobFeedFilterContext'
import SalarySlider from './SalarySlider'
import TagSelect from './TagSelect'

interface FilterDrawerProps {
  width?: number
}

export default function FilterDrawer(props: FilterDrawerProps) {
  const width = props?.width || 270
  const { setSearchString, searchString, tags, setTags, minSalary, maxSalary, setMinSalary, setMaxSalary } = useJobFeedFilters()
  const handleSalaryChange = (salary: [number, number]) => {
    setMinSalary(salary[0])
    setMaxSalary(salary[1])
  }
  return (
    <Drawer
      sx={{
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          p: 4,
          pt: 12,
        },
      }}
      anchor='left'
      variant='permanent'>
      {/* SEARCH */}
      <Box>
        <Typography variant='body2'>Search</Typography>
        <TextField fullWidth size='small' id='search' placeholder='Software Engineer...' value={searchString} onChange={e => setSearchString(e.target.value)} />
      </Box>

      {/* TAGS */}
      <Box>
        <Typography variant='body2'>Tags</Typography>
        <TagSelect value={tags} onChange={setTags} />
      </Box>

      {/* SALARY */}
      <Box>
        <Typography variant='body2'>Salary</Typography>
        <SalarySlider value={[minSalary, maxSalary]} onChange={handleSalaryChange}/>
      </Box>

      {/* EXPERIENCE */}
      <Typography variant='body2'>Experience</Typography>
      <Slider min={0} max={100000} step={10000} value={[0, 100000]} />
     

    </Drawer>
  )
}
