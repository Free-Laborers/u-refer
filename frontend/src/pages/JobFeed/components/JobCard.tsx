import { Button, Chip, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
// @ts-ignore
import { JobPost } from '../../../../../backend/node_modules/prisma/prisma-client'
import ValueWithLabel from '../../../components/ValueWithLabel'

interface JobCardProps {
  job: JobPost
}

export default function JobCard(props: JobCardProps) {
  const { job } = props
  const JobCardContent = job ? (
    <Box height='100%' display='flex' flexDirection='column'>
      <Box flexGrow={1}>
        <Box mb={1} display='flex'>
          <Typography flexGrow={1} variant='h6'>
            {job?.title}
          </Typography>
          <Typography>{new Date(job?.createdDate).toLocaleDateString()}</Typography>
        </Box>
        <Box mb={5} display='flex'>
          {
            // @ts-ignore
            job.PostToTag.map(ptt => (
              <Chip sx={{ mr: 1 }} size='small' label={<b>{ptt.tag.name}</b>} color='primary' />
            ))
          }
        </Box>
        <ValueWithLabel label='Description' value={job?.description} />
        <ValueWithLabel label='Salary' value={'$' + job?.salary.toLocaleString()} />
        <ValueWithLabel label='Experience' value={job?.minYearsExperience} />
        <ValueWithLabel label='Openings' value={job?.openings} />
      </Box>
      <Button variant='contained' color='primary'>
        Refer
      </Button>
    </Box>
  ) : (
    <Typography>Click on a job to learn more!</Typography>
  )
  return <Paper sx={{ mx: 2, p: 2, height: '100%' }}>{JobCardContent}</Paper>
}
