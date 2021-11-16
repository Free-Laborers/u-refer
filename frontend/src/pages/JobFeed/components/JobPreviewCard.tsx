import { Chip, Paper, Stack, Typography } from "@mui/material";
// @ts-ignore
import { JobPost } from "../../../../../backend/node_modules/prisma/prisma-client";
import ValueWithLabel from "../../../components/ValueWithLabel";

interface JobPreviewCardProps {
  job: JobPost;
  onClick;
}

export default function JobPreviewCard(props: JobPreviewCardProps) {
  const { job, onClick } = props;
  return (
    <Paper onClick={onClick} sx={{ mb: 2, p: 2, cursor: "pointer" }}>
      <Typography mb={2} variant="h6">
        {job.title}
      </Typography>
      <Stack direction="row" spacing={0.5} mb = {2}>
          {
            // @ts-ignore
            job.PostToTag.map(ptt => (
              <Chip
              label = {ptt.Tag.name}
              variant ="filled"
              color='default' 
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
    </Paper>
  );
}
