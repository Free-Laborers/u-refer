import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import axios from 'axios';

const theme = createTheme();

const CreateReferral = () => {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [{ data: job }] = useAxios({
    url: `http://localhost:5000/jobPost/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('authorization'),
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jobListingData = {
      jobPostId: id,
      email: data.get('email'),
      firstName: data.get('name'),
      lastName: 'TODO(luna): names often cannot be divided into first and last',
      description: data.get('description'),
    };

    try {
      const config = {
        method: 'post' as 'post',
        url: 'http://127.0.0.1:5000/referral',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('authorization'),
        },
        data: JSON.stringify(jobListingData),
      };
      const response = await axios(config);
      if (response.status === 200) {
        // TODO(luna): i want this to be /jobs/:id, but that's not supported yet
        history.replace('/jobs');
      } else {
        alert(response.data);
      }
    } catch (e) {
      alert(e);
    }
  };

  if (!localStorage.getItem('authorization')) {
    return <Redirect to="/login" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {job?.position ?? 'Job referral form'}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Candidate Name"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Candidate Email"
              name="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={16}
              id="description"
              label="Why would they be a good fit?"
              name="description"
              autoFocus
            />
            {/* <Autocomplete
                    id='tagsAutoComplete' 
                    renderInput={function (params: AutocompleteRenderInputParams): React.ReactNode {
                        return <TextField {...params} label = "Tags" />
                    }}
                    sx = {{width: 300}}
                    options={tags}
                    onChange={(event, value) => {
                        if (value && !selectedTagsSet.has(value)){
                            setSelectedTags(selectedTags.concat(value));
                            selectedTagsSet.add(value);
                            setSelectedTagsSet(selectedTagsSet)
                        } 
                    }}
                    // TODO(luna): want to copy something like the above
                    // (from Listing.tsx) for internal employees yay
                /> */}
            <Button
              style={{
                borderRadius: 35,
                backgroundColor: '#21b6ae',
                padding: '18px 36px',
                fontSize: '18px',
              }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Get nepotism!
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateReferral;
