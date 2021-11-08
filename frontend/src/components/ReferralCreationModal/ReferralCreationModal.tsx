import { ReactElement, useState } from 'react'
import { Button, Modal, ModalProps, Paper, Step, Stepper, Typography, StepLabel, Box } from '@mui/material'
// @ts-ignore
import { JobPost } from '../../../../backend/node_modules/@prisma/client'
import ReviewPage from './pages/ReviewPage'

interface ReferralCreationModalProps {
  jobPost: JobPost,
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
  const { jobPost, onClose, ...modalProps } = props
  const [ activeStep, setActiveStep ] = useState(0)

  // Array of [label, component] pairs
  const steps: [string, ReactElement][] = [
    // TODO
    ['Personal', <div/>],
    // TODO
    ['Recommendation', <div/>],
    // TODO
    ['Documents', <div/>],
    // TODO
    ['Review', <ReviewPage/>],
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

    // The arguments passed to onClose are arbitrary – only passed to satisty requirements
    onClose && onClose({}, 'escapeKeyDown')
  }


  return (
    <Modal {...modalProps}>
      <Paper sx={style}>
        <Typography variant='h5'>Referral for {jobPost?.title}</Typography>
        <Box sx={{ height: '500px' }}>
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
