import { Drawer, TextField, Typography, Box, Divider } from '@mui/material'
import useJobFeedFilters from '../../../contexts/JobFeedFilterContext'
import ExperienceSlider from './ExperienceSlider'
import SalarySlider from './SalarySlider'
import TagSelect from './TagSelect'

interface FilterDrawerProps {
  width?: number
}

export default function FilterDrawer(props: FilterDrawerProps) {
  const width = props?.width || 270

  const {
    setSearchString,
    searchString,
    tags,
    setTags,
    minSalary,
    maxSalary,
    setMinSalary,
    setMaxSalary,
    setMinExperience,
    setMaxExperience,
    maxExperience,
    minExperience,
  } = useJobFeedFilters()

  const handleSalaryChange = (salaryRange: [number, number]) => {
    setMinSalary(salaryRange[0])
    setMaxSalary(salaryRange[1])
  }

  const handleExperienceChange = (experienceRange: [number, number]) => {
    setMinExperience(experienceRange[0])
    setMaxExperience(experienceRange[1])
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
      <Box mb={3}>
        <Typography variant='body2'>Search</Typography>
        <TextField
          fullWidth
          size='small'
          id='search'
          placeholder='Software Engineer...'
          value={searchString}
          onChange={e => setSearchString(e.target.value)}
        />
      </Box>
      <Divider sx={{ mx: -4 }} />

      {/* TAGS */}
      <Box mt={3}>
        <Typography variant='body2'>Tags</Typography>
        <TagSelect value={tags} onChange={setTags} />
      </Box>

      {/* SALARY */}
      <Box mt={3}>
        <Typography variant='body2'>Salary</Typography>
        <SalarySlider value={[minSalary, maxSalary]} onChange={handleSalaryChange} />
      </Box>

      {/* EXPERIENCE */}
      <Box mt={3}>
        <Typography variant='body2'>Experience</Typography>
        <ExperienceSlider value={[minExperience, maxExperience]} onChange={handleExperienceChange} />
      </Box>
    </Drawer>
  )
}
