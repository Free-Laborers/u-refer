import { Typography, Box } from '@mui/material'
import React from 'react'


interface FieldDisplayProps {
  text: string
}

const FieldDisplay = (props: FieldDisplayProps) => {
  const { text } = props
  return <Typography sx={{ml: 2}} gutterBottom color='GrayText'>{text}</Typography>
}

const ReviewSection: React.FC = (props) => {
  const { children } = props
  return (
      <Box borderRadius={1} paddingX={2} mb={2} paddingY={1} bgcolor='#eee'>{children}</Box>
  )
}

interface ReviewPageProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  reason: string
  resume: boolean
}

export default function ReviewPage(props: ReviewPageProps) {
  const { firstName, lastName, email, phone, reason, resume } = props
  return (
    <Box>
      <Typography gutterBottom variant='h6'>Review</Typography>
      <ReviewSection>
        <Typography sx={{ marginTop: "8px" }}>
          Personal
        </Typography>
        <FieldDisplay text={`First name: ${firstName}`} />
        <FieldDisplay text={`Last name: ${lastName}`} />
        <FieldDisplay text={`Email: ${email}`} />
        <FieldDisplay text={`Phone: ${phone}`} />
      </ReviewSection>
      <ReviewSection>
        <Typography sx={{ marginTop: "8px" }}>
          Recommendation
        </Typography>
        <FieldDisplay text={reason} />
      </ReviewSection>
      <ReviewSection>
        <Typography sx={{ marginTop: "8px" }}>
          Documents
        </Typography>
        <FieldDisplay text={resume ? 'resume.pfd' : 'N/A'} />
      </ReviewSection>
    </Box>
  );
}
