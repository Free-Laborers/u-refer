import { Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent, SelectProps, Theme } from '@mui/material'
import { Cancel } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import useAxios from 'axios-hooks'
import { useState } from 'react'

// Styles dropdown items
function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  }
};

type TagSelectProps = {
  value: string[],
  onChange: (val: string[]) => any
}

export default function TagSelect(props: TagSelectProps) {
  const { onChange, value } = props
  const theme = useTheme()
  const [{ data }] = useAxios('http://localhost:5000/tags')
  const tags = data?.tags || []

  const handleDelete = (valToDelete: string) => {
    const newTags = [...value].filter(t => t !== valToDelete)
    onChange(newTags)
  }

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    onChange(value as string[])
  }

  return (
    <Select
      // {...selectProps}
      size='small'
      multiple
      value={value}
      onChange={handleChange}
      input={<OutlinedInput fullWidth placeholder='Tags' />}
      renderValue={selected => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map(value => (
            // TODO Figure out why handleDelete is not triggered when button is clicked
            <Chip deleteIcon={
              <Cancel
                onMouseDown={(event) => event.stopPropagation()}
              />
            } size='small' key={value} label={value} onDelete={() => handleDelete(value)} />
          ))}
        </Box>
      )}
    >
      {/* Remove duplicates and map name to select items */}
      {Array.from(new Set<string>(tags.map(t => t.name))).map((x) => (
        <MenuItem key={x} value={x} style={getStyles(x, value, theme)}>
          {x}
        </MenuItem>
      ))}
    </Select>
  )
}