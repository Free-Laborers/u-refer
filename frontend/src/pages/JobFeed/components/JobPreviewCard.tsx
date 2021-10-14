import { Paper, Typography } from '@mui/material'
// import { JobPost } from '../../../../../backend/node_modules/prisma/prisma-client'

interface JobPreviewCardProps {
  job
}

export default function JobPreviewCard(props: JobPreviewCardProps) {
  const { job } = props
  return (
    <Paper sx={{m: 2, mt: 0, p: 2}}>
      <Typography variant='h6'>{job.title}</Typography>
    </Paper>
  )
}
