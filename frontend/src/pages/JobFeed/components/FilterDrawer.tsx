import { Drawer, TextField, Typography, Box } from "@mui/material";
import useJobFeedFilters from "../../../contexts/JobFeedFilterContext";
import ExperienceSlider from "./ExperienceSlider";
import SalarySlider from "./SalarySlider";
import TagSelect from "./TagSelect";

interface FilterDrawerProps {
  width?: number
}

export default function FilterDrawer (props: FilterDrawerProps) {
  const width = props?.width || 270;

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
    minExperience
  } = useJobFeedFilters();

  const handleSalaryChange = (salaryRange: [number, number]) => {
    setMinSalary(salaryRange[0]);
    setMaxSalary(salaryRange[1]);
  };

  const handleExperienceChange = (experienceRange: [number, number]) => {
    setMinExperience(experienceRange[0]);
    setMaxExperience(experienceRange[1]);
  };

  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          width: width,
          boxSizing: "border-box",
          p: 5,
          pt: 12
        }
      }}
      anchor='left'
      variant='permanent'>
      {/* SEARCH */}
      <Box>
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

      {/* TAGS */}
      <Box>
        <Typography variant='body2'>Tags</Typography>
        <TagSelect value={tags} onChange={setTags} />
      </Box>

      {/* SALARY */}
      <Box>
        <Typography variant='body2'>Salary</Typography>
        <SalarySlider value={[minSalary, maxSalary]} onChange={handleSalaryChange} />
      </Box>

      {/* SALARY TEXT BOXES */}
      <Box>
        <TextField
        margin='dense'
        fullWidth
        size='small'
        label='Minimum Salary'
        value={minSalary}
        onChange={e => setMinSalary((isNaN(parseInt(e.target.value))) ? 0 : parseInt(e.target.value))}
        />
      </Box>
      <Box>
        <TextField
        margin='dense'
        fullWidth
        size='small'
        label='Maximum Salary'
        value={maxSalary}
        onChange={e => setMaxSalary((isNaN(parseInt(e.target.value))) ? 0 : parseInt(e.target.value))}
      />
      </Box>

      {/* EXPERIENCE */}
      <Typography variant='body2'>Experience</Typography>
      <ExperienceSlider value={[minExperience, maxExperience]} onChange={handleExperienceChange} />

      {/* EXPERIENCE TEXT BOXES */}
      <Box>
        <TextField
        margin='dense'
        fullWidth
        size='small'
        label='Minimum Experience'
        value={minExperience}
        onChange={e => setMinExperience((isNaN(parseInt(e.target.value))) ? 0 : parseInt(e.target.value))}
        />
      </Box>
      <Box>
        <TextField
        margin='dense'
        fullWidth
        size='small'
        label='Maximum Experience'
        value={maxExperience}
        onChange={e => setMaxExperience((isNaN(parseInt(e.target.value))) ? 0 : parseInt(e.target.value))}
        />
      </Box>
    </Drawer>
  );
}
