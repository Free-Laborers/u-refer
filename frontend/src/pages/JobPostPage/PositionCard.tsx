import { Paper, Typography } from "@mui/material";
import JobPost from "../../interfaces/JobPost"


interface PositionCardProps {
  job: JobPost;
}

export default function PositionCard(props: PositionCardProps) {
  const { job } = props;
  return (
    <Paper sx={{ mb: 2, p: 2, cursor: "pointer" }}>
      <Typography mb={2} variant="h6">
        {job?.title}
      </Typography>
      <Typography mb={2} variant="subtitle1">
        {job?.description}
      </Typography>
      <Typography mb={2} variant="subtitle2">
        Experience: {job?.minYearsExperience}
      </Typography>
      <Typography mb={2} variant="subtitle2">
        Salary: {job?.salary}
      </Typography>
    </Paper>
  );
}
