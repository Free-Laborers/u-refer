import {useEffect, useState} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Pagination} from '@mui/material'
import axios from 'axios';
import React from 'react';
import ReferralPreviewCard from './components/ReferralPreviewCard';
import ReferralCard from './components/ReferralCard';
//https://stackoverflow.com/questions/66012476/how-to-show-hide-mui-tabs-based-on-a-condition-and-maintain-the-right-tab-index
// @ts-ignore
import { Referral } from "../../../../../backend/node_modules/prisma/prisma-client";
import useAxios from 'axios-hooks';

interface ProfileResponseType {
  data: Referral[];
  numResults: number;
}

enum sortStatus {
  ASC = "asc",
  DEC = "desc",
}

export default function Profile() {
  // eslint-disable-next-line
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    position: "",
    isManager: "",
  });
  
  const [selectedReferral, setSelectedReferral] = useState<any>(null);  
  const sortBy = "createdDate";
  const [val, setValue] = React.useState('');
  const [selectedSort, setSelectedSort] = useState<sortStatus>(sortStatus.DEC);
  const sortDirection = selectedSort;
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState<any>('');
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    //filterBy(event.target.value as string);
    handleValue(Number(event.target.value));
  };
  const handleValue = (value: number) => {
    console.log(value);
    if(value===1){
      console.log('hey');
      setSelectedSort(sortStatus.DEC);
    }
    if(value===2){
      console.log('hi');
      setSelectedSort(sortStatus.ASC);
    }
    if(value===3){
      console.log('howdy');
      setStatus("OPEN");
    }
    if(value===4){
      console.log('hello');
      setStatus("CLOSED");
    }
  }
  console.log(status);
  console.log(sortDirection);
  const [{ data }] = useAxios<ProfileResponseType>({
    url: `/referral/user`,
    headers: {
      Authorization: localStorage.getItem("authorization"),
    },
    params: {
      status,
      userId: userData.id,
      page,
      sortBy,
      sortDirection,
    },
  });
  
  const PAGE_SIZE = 10;
  const numResults = data?.numResults || 0;
  const numPages = Math.ceil(numResults / PAGE_SIZE);
  
  useEffect(() => {
    async function getData() {
      const auth = localStorage.getItem('authorization');

      if (auth) {
        try {
          const response = await axios("/employee/profile", {
            method: 'GET',
            headers: { 
              'Authorization': localStorage.getItem('authorization')
            },
          })
          const json = await response.data;
          return setUserData(json.user);
        } catch(err){
          console.error(err)
        }
      }
    }

    getData();
  }, []);

  const renderMenu = (
    <Box mb={4} sx={{ minWidth: 120 , m: 2}}>
      <FormControl fullWidth>
        <InputLabel>Sort By:</InputLabel>
        <Select
          value={val}
          label="Sort By:"
          onChange={handleChange}
        >
          <MenuItem value={1}>Date: Most Recent</MenuItem>
          <MenuItem value={2}>Date: Oldest</MenuItem>
          <MenuItem value={3}>Open</MenuItem>
          <MenuItem value={4}>Closed</MenuItem>
          {/* <MenuItem value={5}>Number of Applicants: Low to High</MenuItem>
          <MenuItem value={6}>Number of Applicants: High to Low</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );

  // Go to first page each time filters are changed. This prevents the user from remaining on a page where entries no longer exist
  useEffect(() => {
  }, [
    status,
    sortBy,
    sortDirection,
  ]);

  
  useEffect(() => {
    if (!selectedReferral && data && data?.data?.length > 0) {
      setSelectedReferral(data?.data[0]);
      setPage(0);
    }
  }, [data, selectedReferral]);


    return (
      <Box height={"calc(100vh - 112px)"}>
        <Box
          m={2}
          display="grid"
          height="100%"
          gridTemplateRows="auto 1fr auto"
          gridTemplateColumns="1fr 1fr"
          gridTemplateAreas={`"sort          ."
                              "referList     referCard"
                              "pagination     ."`}                  
          columnGap={2}
        >
          <Box sx={{ gridArea: "sort" }} my={1}>
            {renderMenu}
          </Box>

          <Box sx={{ gridArea: "referList" }}>
            {data?.data?.map((referral) => (
              <ReferralPreviewCard onClick={() => setSelectedReferral(referral)} referral={referral} />
            ))} 
          </Box>
          <Box sx={{ gridArea: "referCard" }} overflow="auto">
            <ReferralCard referral={selectedReferral}/>
          </Box>
          <Box mx="auto" my={2} sx={{ gridArea: "pagination" }}>
            <Pagination
              count={numPages}
              page={page + 1}
              onChange={(e, page) => setPage(page - 1)}
            />
          </Box>
        </Box>
      </Box>
    )
}