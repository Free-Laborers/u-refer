import { useState } from 'react';
import { Button, Typography } from '@mui/material'
import axios from 'axios'

export default function Home() {
  const [fetchedResult, setFetchedResult] = useState<any>(null);
  const testRequest = async () => {
    const res = await axios.get('http://localhost:5000/home')
    setFetchedResult(res.data)
  }
  return (
    <>
      <Typography variant='h1'>Home</Typography>
      <Button onClick={testRequest}>Fetch</Button>
      <Typography>Fetched result: {JSON.stringify(fetchedResult, null, 2)}</Typography>
    </>
  )
}
