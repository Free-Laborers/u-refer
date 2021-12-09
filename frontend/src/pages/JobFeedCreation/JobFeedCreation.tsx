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
import { Redirect } from 'react-router-dom';

import useAuth from "../../hooks/useAuth"
import useAxios from 'axios-hooks';

// @ts-ignore
import { Tag } from "../../../../../backend/node_modules/prisma/prisma-client";

//axios has some weird type error stuff, so I used require here. Someone please figure it out later. 
const axios = require("axios");
const theme = createTheme();
//I do not have an clear idea about where the frontend will store the list of Tags
//todo: store the list of tags somewhere and use it for this component.

//const tags: string[] = [   "React"];

const JobFeedCreation = () => {

    interface TagResponseType {
        tags: Tag[];
      }
    
    const [{ data }] = useAxios<TagResponseType>({
        url: "/tag/",
        headers: {
          Authorization: localStorage.getItem("authorization"),
        },
      });
      
    const tags = (data?.tags) ? (data?.tags).map(x => x.name) : [];

    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [selectedTagsSet, setSelectedTagsSet]  = React.useState<Set<string>>(new Set());
    const [redirectToJobFeed, setRedirectToJobFeed] = React.useState<Boolean>(false)
    const {user} = useAuth()
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (
            !(data.get('title')) &&
            !(data.get('position')) &&
            !(data.get('description')) &&
            !(data.get('minYears')) &&
            !(data.get('salary')) &&
            !(data.get("openings"))
        ){
            return alert("Please fill out the required fields");
        }
        if (!user){
            return alert("error: user is null");
        }

        const jobListingData = {
            title: data.get('title'),
            position: data.get('position'),
            description: data.get('description'),
            minYearsExperience: Number(data.get('minYears')),
            salary: Number(data.get('salary')),
            openings: Number(data.get('openings')),
            tags: selectedTags,
            hiringManagerId: user.id
        }

        try {
            const config = {
                method: 'post',
                url: '/jobPost',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("authorization"),
                },
                data : JSON.stringify(jobListingData)
            };
            const response = await axios(config);
            console.log(response.data);
            alert(response.data.message);
            setRedirectToJobFeed(true);
        } catch (e){
            alert(e)
        }
    };

    if (redirectToJobFeed){
        return <Redirect to = "/jobs"/>
    }

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
                        /><TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows = {16}
                            id="description"
                            label="Job Description"
                            name="description"
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

export default JobFeedCreation