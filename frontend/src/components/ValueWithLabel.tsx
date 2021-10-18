import { Typography, Box, TypographyProps } from '@mui/material'

interface ValueWithLabelProps {
  value: any
  label: string
}

export default function ValueWithLabel(props: ValueWithLabelProps & TypographyProps) {
  const { value, label, ...typographyProps } = props
  return (
    <Typography mb={2} {...typographyProps}>
      {label}:{' '}
      <Box component='span' color='GrayText'>
        {value as string}
      </Box>
    </Typography>
  )
}
