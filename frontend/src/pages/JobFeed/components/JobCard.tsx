import { useState } from 'react'
import { Button, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
// @ts-ignore
import { JobPost } from '../../../../../backend/node_modules/prisma/prisma-client'
import ValueWithLabel from '../../../components/ValueWithLabel'
import ReferralCreationModal from '../../../components/ReferralCreationModal'

interface JobCardProps {
  job: JobPost
}

export default function JobCard(props: JobCardProps) {
  const { job } = props
  const [referralCreationModalOpen, setReferralCreationModalOpen] = useState(false)
  const JobCardContent = job ? (
    <Box height='100%' display='flex' flexDirection='column'>
      <Box flexGrow={1}>
        <Box mb={3} display='flex'>
          <Typography flexGrow={1} variant='h6'>
            {job?.title}
          </Typography>
          <Typography>{new Date(job?.createdDate).toLocaleDateString()}</Typography>
        </Box>
        <ValueWithLabel label='Description' value={job?.description} />
        <ValueWithLabel label='Salary' value={'$' + job?.salary.toLocaleString()} />
        <ValueWithLabel label='Experience' value={job?.minYearsExperience} />
        <ValueWithLabel label='Openings' value={job?.openings} />
      </Box>
      <Button onClick={() => setReferralCreationModalOpen(true)} variant='contained' color='primary'>
        Refer
      </Button>
    </Box>
  ) : (
    <Typography>Click on a job to learn more!</Typography>
  )
  return (
    <Paper sx={{ mx: 2, p: 2, height: '100%' }}>
      {JobCardContent}
      <ReferralCreationModal open={referralCreationModalOpen} onClose={() => setReferralCreationModalOpen(false)} jobPost={job} />
    </Paper>
  )
}
