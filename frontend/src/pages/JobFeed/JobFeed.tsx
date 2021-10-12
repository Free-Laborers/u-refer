import { Typography } from '@mui/material'
import useAxios from 'axios-hooks'
// import { JobPost } from '@pris'
import JobCard from './components/JobCard'

export default function JobFeed() {
  const [{ data, loading, error }, refetch] = useAxios('http://localhost:5000/jobs')
  return (
    <>
      <Typography variant='h1'>Job Feed</Typography>
      {data && data.map(job => <JobCard job={job} />)}
    </>
  )
}
