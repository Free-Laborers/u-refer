import { Chip, MenuItem, OutlinedInput, Select } from '@mui/material'
import { Box } from '@mui/system'
import useAxios from 'axios-hooks'
import { useState } from 'react'

export default function TagSelect() {
  // const tags = ['React', 'MUI', 'Another']
  const [{ data }] = useAxios('http://localhost:5000/tags')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const tags = data?.tags || []

  return (
    <Select
      size='small'
      placeholder='Tags'
      multiple
      value={selectedTags}
      onChange={e => setSelectedTags(e.target.value as string[])}
      input={<OutlinedInput />}
      renderValue={selected => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map(value => (
            <Chip key={value} label={value} />
          ))}
        </Box>
      )}>
      {tags.map(({name, id}) => (
        <MenuItem key={id} value={name}>
          {name}
        </MenuItem>
      ))}
    </Select>
  )
}
