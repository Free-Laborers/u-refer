import { Slider } from "@mui/material";

interface ExperienceSliderProps {
  value: [number, number]
  onChange: (salaryRange: [number, number]) => any
}

export default function ExperienceSlider (props: ExperienceSliderProps) {
  // TODO fetch actual max and min years of experience
  const { value, onChange } = props;

  const handleChange = (e, value) => {
    onChange(value as [number, number]);
  };

  return (
    <Slider
      sx={{
        mb: 3,
        "& .MuiSlider-valueLabel": {
          fontSize: 12,
          fontWeight: "normal",
          top: "48px",
          backgroundColor: "unset",
          color: (theme) => theme.palette.text.primary,
          "&:before": {
            display: "none"
          }
        }
      }}
      valueLabelFormat={v => v.toString() + " yrs"}
      onChange={handleChange}
      valueLabelDisplay='on'
      min={0}
      max={10}
      step={1}
      value={value}
    />
  );
}
