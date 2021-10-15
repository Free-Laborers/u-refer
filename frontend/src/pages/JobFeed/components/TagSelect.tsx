import { Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import useAxios from 'axios-hooks'
import { useState } from 'react'

// Styles dropdown items
function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  }
}

export default function TagSelect() {
  const theme = useTheme()
  const [{ data }] = useAxios('http://localhost:5000/tags')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const tags = data?.tags || []

  const handleDelete = (valToDelete: string) => {
    const newTags = [...selectedTags].filter(t => t !== valToDelete)
    console.log(newTags)
    setSelectedTags(newTags)
  }

  const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const {
      target: { value },
    } = event
    setSelectedTags(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <Select
      size='small'
      multiple
      value={selectedTags}
      onChange={handleChange}
      input={<OutlinedInput />}
      renderValue={selected => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map(value => (
            // TODO Figure out why handleDelete is not triggered when button is clicked
            <Chip key={value} label={value} onDelete={() => handleDelete(value)} />
          ))}
        </Box>
      )}
    >
      {tags.map(({ name, id }) => (
        <MenuItem key={name} value={name} style={getStyles(name, selectedTags, theme)}>
          {name}
        </MenuItem>
      ))}
    </Select>
  )
}