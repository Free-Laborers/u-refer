import { Drawer, Slider, TextField, Typography, Select, Box, Chip, MenuItem, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { useState } from 'react'
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
          p: 3,
          pt: 12,
        },
      }}
      anchor='left'
      variant='permanent'>
      {/* SEARCH */}
      <Typography variant='body2'>Search</Typography>
      <TextField size='small' id='search' placeholder='Software Engineer...' />

      {/* TAGS */}
      <TagSelect />
      <div>
        
      </div>

      <Slider min={0} max={100000} step={10000} value={[0, 100000]} />
    </Drawer>
  )
}
