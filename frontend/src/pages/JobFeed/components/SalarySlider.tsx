import { Slider } from '@mui/material'
import { useState } from 'react'

export default function SalarySlider() {
  // TODO fetch actual max and min salaries
  const [salaryRange, setsalaryRange] = useState<[number, number]>([0, 100000])
  return (
    <Slider
      sx={{
        mb: 3,
        '& .MuiSlider-valueLabel': {
          fontSize: 12,
          fontWeight: 'normal',
          top: '48px',
          backgroundColor: 'unset',
          color: (theme) => theme.palette.text.primary,
          '&:before': {
            display: 'none',
          }
        }
      }}
      valueLabelFormat={v => '$' + v.toLocaleString()}
      onChange={(e, value) => setsalaryRange(value as [number, number])}
      valueLabelDisplay='on'
      min={0}
      max={100000}
      step={10000}
      value={salaryRange}
    />
  )
}
