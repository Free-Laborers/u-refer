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
import { Autocomplete, AutocompleteRenderInputParams, Chip, Grid } from '@mui/material';

const theme = createTheme();

//I do not have an clear idea about where the frontend will store the list of Tags
//todo: store the list of tags somewhere and use it for this component.
const tags: string[] = [
    "React", 
    "Prisma",
];
const Listing = () => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [selectedTagsSet, setSelectedTagsSet]  = React.useState<Set<string>>(new Set());
    const TagChipsJSX = selectedTags.map(tag => {
        return (
            <Grid item key = {tag}>
                <Chip label = {tag} onDelete={() => {
                    setSelectedTags(selectedTags.filter(t => t !== tag));
                    selectedTagsSet.delete(tag);
                    setSelectedTagsSet(selectedTagsSet)
                }}></Chip>
            </Grid>
        )
    }) 

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
                        <Autocomplete
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
                        />
                        <Grid container direction={"row"} spacing={1} m={1}>
                            {TagChipsJSX}
                        </Grid>
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