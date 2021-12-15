import { Chip, Paper, Stack, Typography, Grid, Tooltip } from "@mui/material";
import { JobPostAndTags } from "../../../interfaces/JobPost"
import ValueWithLabel from "../../../components/ValueWithLabel";
import useAuth from "../../../hooks/useAuth";
import StarsIcon from '@mui/icons-material/Stars';

interface JobPreviewCardProps {
  job: JobPostAndTags;
  onClick;
}

export default function JobPreviewCard(props: JobPreviewCardProps) {
  const { user } = useAuth();

  const { job, onClick } = props;
  return (
    <Paper onClick={onClick} sx={{ mb: 2, p: 2, cursor: "pointer" }}>
      <Grid container>
        <Grid item xs={6}>
          <Typography mb={2} variant="h6">
            {job.title}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {job.hiringManagerId === user?.id &&
            <Tooltip title="My Job Posting" style={{ float: "right" }}>
              <StarsIcon color="primary" />
            </Tooltip>
          }
        </Grid>
      </Grid>
      <Stack direction="row" spacing={0.5} mb={2}>
        {
          job.PostToTag.map(ptt => (
            <Chip
              label={ptt.Tag.name}
              variant="filled"
              color='default'
              key={ptt.id}
            />
          ))
        }
      </Stack>
      <ValueWithLabel
        sx={{
          display: "-webkit-box",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "initial",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
        }}
        label="Description"
        value={job?.description}
      />
    </Paper >
  );
}
