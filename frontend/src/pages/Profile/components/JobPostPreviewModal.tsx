import ValueWithLabel from "../../../components/ValueWithLabel";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {Grid, Chip, Modal, ModalProps, Paper, Stack, Typography, Box, IconButton } from '@mui/material'

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
    <Modal onClose={closeModal} {...modalProps}>
      <Paper sx={style}>
          <Box style={{ overflowX: "hidden" }} sx={{maxHeight: '500px'}}>
            <Grid container justifyContent="flex-end">
              <IconButton onClick={closeModal}>
                <CancelOutlinedIcon color='primary'/>
              </IconButton>
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
              value={"$" + jobPost?.salary.toLocaleString()}/>
            <ValueWithLabel
              label="Experience"
              value={jobPost?.minYearsExperience.toLocaleString()}/>
          </Box>   
      </Paper>
    </Modal>
  )
}



