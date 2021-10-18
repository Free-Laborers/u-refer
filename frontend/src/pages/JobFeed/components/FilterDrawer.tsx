import { Drawer, Slider, TextField, Typography, Select, Box, Chip, MenuItem, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { useState } from 'react'
import SalarySlider from './SalarySlider'
import TagSelect from './TagSelect'

interface FilterDrawerProps {
  width?: number
}

export default function FilterDrawer(props: FilterDrawerProps) {
  const width = props?.width || 270
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
        <TextField fullWidth size='small' id='search' placeholder='Software Engineer...' />
      </Box>

      {/* TAGS */}
      <Box>
        <Typography variant='body2'>Tags</Typography>
        <TagSelect />
      </Box>

      {/* SALARY */}
      <Box>
        <Typography variant='body2'>Salary</Typography>
        <SalarySlider />
      </Box>

      {/* EXPERIENCE */}
      <Typography variant='body2'>Experience</Typography>
      <Slider min={0} max={100000} step={10000} value={[0, 100000]} />
     

    </Drawer>
  )
}
