import { Paper, Typography } from '@mui/material'
// import { JobPost } from '../../../../../backend/node_modules/prisma/prisma-client'

interface JobCardProps {
  job
}

export default function JobCard(props: JobCardProps) {
  const { job } = props
  return (
    <Paper sx={{m: 2, p: 2}}>
      <Typography variant='h6'>{job.title}</Typography>
    </Paper>
  )
}
