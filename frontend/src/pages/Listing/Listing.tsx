import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';

const theme = createTheme();

const Listing = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            title: data.get('title'),
            position: data.get('position'),
            description: data.get('description'),
            minYearsExperience: data.get('minYears'),
            salary: data.get('salary'),
            openings: data.get('openings')
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Create A Job Listing
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Job Title"
                            name="title"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="position"
                            label="Job Position"
                            name="position"
                            autoFocus
                        /><TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows = {16}
                            id="description"
                            label="Job Description"
                            name="description"
                            autoFocus
                        />
                        <Grid container direction = {"row"} spacing = {3}>
                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    id="minYears"
                                    autoComplete="openings"
                                    label="Minimum Years of Experience"
                                    type="number"
                                    name="minYears"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    id="salary"
                                    label="Salary"
                                    name="salary"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    id="openings"
                                    autoComplete="openings"
                                    label="Number of Openings"
                                    type="number"
                                    name="openings"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    autoFocus
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            margin="normal"
                            required
                            id="openings"
                            autoComplete="openings"
                            label="Tags"
                            name="openings"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoFocus
                        />
                        <Button
                            style={{
                                borderRadius: 35,
                                backgroundColor: "#21b6ae",
                                padding: "18px 36px",
                                fontSize: "18px"
                            }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Job Listing
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Listing