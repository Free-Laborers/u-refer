import { Drawer, Slider, TextField, Box } from '@mui/material'

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
      <TextField placeholder='Search' />
      <TextField placeholder='Search' />
      <Slider min={0} max={100000} step={10000} value={[0, 100000]} />
    </Drawer>
  )
}
