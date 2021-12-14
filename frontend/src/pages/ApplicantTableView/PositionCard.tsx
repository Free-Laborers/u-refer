import { Chip, Paper, Stack, Typography, Box } from "@mui/material";
import { Redirect } from "react-router";
import { JobPostAndTags } from "../../interfaces/JobPost";
import useAxios from "axios-hooks";

interface PositionCardProps {
  jobPostID: string;
}

export default function PositionCard(props: PositionCardProps) {

  const [{ data, error }] = useAxios<JobPostAndTags>({
    url: "/jobPost/" + props.jobPostID,
    headers: { Authorization: localStorage.getItem("authorization") }
  });

  if (error) {
    return <Redirect to='/jobs' />
  }

  return (<Box sx={{ mt: 2, mb: 2 }}>
    <Typography variant="h3">
      Position:
    </Typography>
    <Paper sx={{ p: 2 }}>
      <Typography mb={2} variant="h6">
        {data?.title}
      </Typography>
      <Typography mb={2} variant="subtitle1">
        {data?.description}
      </Typography>
      <Typography mb={2} variant="subtitle2">
        Experience: {data?.minYearsExperience}
      </Typography>
      <Typography mb={2} variant="subtitle2">
        Salary: {data?.salary}
      </Typography>
      <Typography mb={2} variant="subtitle2">
        Tags:
      </Typography>
      <Stack direction="row" spacing={0.5} mb={2}>
        {
          data?.PostToTag.map((ptt) => (
            <Chip label={ptt.Tag.name} key={ptt.id} variant="filled" color="default" />
          ))
        }
      </Stack>
    </Paper>
  </Box>
  );
}
