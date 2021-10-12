import { Typography } from '@mui/material'
import useAxios from 'axios-hooks'

export default function JobFeed() {
  const [{ data, loading, error }, refetch] = useAxios('http://localhost:5000/jobs')
  return (
    <>
      <Typography variant='h1'>Job Feed</Typography>
      {JSON.stringify(data, undefined, 2)}
    </>
  )
}
