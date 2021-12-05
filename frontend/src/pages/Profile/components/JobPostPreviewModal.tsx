import ValueWithLabel from "../../../components/ValueWithLabel";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {Grid, Chip, Modal, ModalProps, Paper, Stack, Typography, Box } from '@mui/material'

// @ts-ignore
import { Referral } from '../../../../backend/node_modules/@prisma/client'

interface JobPostViewModalProps {
    referral: Referral;
    closeModal: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  p: 4,
}

export default function JobPostViewModal(props: JobPostViewModalProps & Omit<ModalProps, 'children'>) {
  const {referral, closeModal, ...modalProps } = props
  const jobPost = referral?.JobPost;

  return (
    <Modal {...modalProps}>
      <Paper sx={style}>
      <Grid container justifyContent="flex-end">
        <CancelOutlinedIcon color='primary' onClick={closeModal}></CancelOutlinedIcon>
      </Grid>
      <Box mb={3} display="flex">
          <Typography flexGrow={1} variant="h6">
            {jobPost?.title}
          </Typography>
          <Typography>
            {new Date(jobPost?.createdDate).toLocaleDateString()}
          </Typography>
      </Box>
      {jobPost?.PostToTag.length!==0 && <Stack direction="row" spacing={0.5} mb = {2}>
        {
          // @ts-ignore
          jobPost.PostToTag.map(ptt => (
            <Chip
              label = {ptt.Tag.name}
              variant ="filled"
              color='default' 
            />
          ))
        }
      </Stack>} 
        <ValueWithLabel 
        label="Description" 
        value={jobPost?.description} />
        <ValueWithLabel
          label="Salary"
          value={"$" + jobPost?.salary.toLocaleString()}
        />
        <ValueWithLabel
          label="Experience"
          value={jobPost?.minYearsExperience.toLocaleString()}
        />
      </Paper>
    </Modal>
  )
}



