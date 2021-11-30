import { ReactElement, useState } from 'react'
import { Button, Modal, ModalProps, Paper, Step, Stepper, Typography, StepLabel, Box, Divider } from '@mui/material'
// @ts-ignore
import { JobPost } from '../../../../backend/node_modules/@prisma/client'
import ResumePage from './pages/ResumePage'
import ReviewPage from './pages/ReviewPage'

interface ReferralCreationModalProps {
  jobPost: JobPost,
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

export default function ReferralCreationModal(props: ReferralCreationModalProps & Omit<ModalProps, 'children'>) {
  const { jobPost, closeModal, ...modalProps } = props
  const [ activeStep, setActiveStep ] = useState(0)
  const reason = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'

  // Array of [label, component] pairs
  const steps: [string, ReactElement][] = [
    // TODO
    ['Personal', <div/>],
    // TODO
    ['Recommendation', <div/>],
    // TODO
    ['Documents', <ResumePage/>],
    // TODO
    ['Review', <ReviewPage firstName='John' lastName='Doe' email='asdf@asdf.com' phone='123-456-7890' reason={reason} resume={true}/>],
  ]

  const handleBack = () => {
    if (activeStep === 0) return
    setActiveStep(activeStep - 1)
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1) return handleSubmit()
    setActiveStep(activeStep + 1)
  }

  const handleSubmit = () => {
    // TODO: Send post request to backend
    closeModal()
  }


  return (
    <Modal onClose={closeModal} {...modalProps}>
      <Paper sx={style}>
        <Typography gutterBottom variant='h5'>Referral for {jobPost?.title}</Typography>
        <Divider/>
        <Box overflow='scroll' my={2} sx={{ height: '500px' }}>
          {steps[activeStep][1]}
        </Box>
        <Stepper activeStep={activeStep}>
          {steps.map(([label, _], i) => {
            return (
              <Step key={i}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        <Box display='flex' justifyContent='space-evenly' mt={2}>
          <Button size='small' onClick={handleBack}>
            Back
          </Button>
          <Button size='small' variant='contained' onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Modal>
  )
}
