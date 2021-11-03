import React, { useState } from 'react'
import { Button, Modal, ModalProps, Paper, Step, Stepper, Typography, StepLabel, Box } from '@mui/material'
// @ts-ignore
import { JobPost } from '../../../../backend/node_modules/@prisma/client'

interface ReferralCreationModalProps {
  jobPost: JobPost
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
  const { jobPost, ...modalProps } = props
  const [activeStep, setActiveStep] = useState(0)

  const handleBack = () => {
    if (activeStep === 0) return
    setActiveStep(activeStep - 1)
  }

  const handleNext = () => {
    if (activeStep === steps.length) return handleSubmit()
    setActiveStep(activeStep + 1)
  }

  const handleSubmit = () => {
    // TODO
  }

  const steps = ['Personal', 'Reccomendation', 'Documents', 'Review']

  return (
    <Modal {...modalProps}>
      <Paper sx={style}>
        <Typography variant='h5'>Referral for {jobPost?.title}</Typography>
        <Box sx={{height: '500px'}}>

        </Box>
        <Stepper activeStep={activeStep}>
          {steps.map((label, i) => {
            return (
              <Step key={i}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        <Box display='flex' justifyContent='space-evenly' mt={2}>
          <Button size='small' onClick={() => handleBack()}>
            Back
          </Button>
          <Button size='small' variant='contained' onClick={() => handleNext()}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Modal>
  )
}
