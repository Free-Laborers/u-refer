import { Slider } from '@mui/material'
import { useState } from 'react'

interface SalarySliderProps {
  value: [number, number]
  onChange: (salaryRange: [number, number]) => any
}

export default function SalarySlider(props: SalarySliderProps) {
  // TODO fetch actual max and min salaries
  const { value, onChange } = props

  const handleChange = (e, value) => {
    onChange(value as [number, number])
  }

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
      onChange={handleChange}
      valueLabelDisplay='on'
      min={0}
      max={100000}
      step={10000}
      value={value}
    />
  )
}
