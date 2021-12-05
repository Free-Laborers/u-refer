import {useEffect, useState} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material'
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

export default function Profile() {
  
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    position: "",
    isManager: "",
  });
  // const PAGE_SIZE = 10;
  const [selectedReferral, setselectedReferral] = useState<any>(null);  
  const [page] = useState(0);
  const [{ data }] = useAxios<ProfileResponseType>({
    url: `/referral/user`,
    headers: {
      Authorization: localStorage.getItem("authorization"),
    },
    params: {
      page,
    },
  });

  // const numResults = data?.numResults || 0;
  // const numPages = Math.ceil(numResults / PAGE_SIZE);

  
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

  const [sort, sortBy] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    sortBy(event.target.value as string);
  };
  const renderMenu = (
    <Box mb={4} sx={{ minWidth: 120 , m: 2}}>
      <FormControl fullWidth>
        <InputLabel>Sort By:</InputLabel>
        <Select
          value={sort}
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


    return (
      <Box height={"calc(100vh - 112px)"}>
        <Box
          m={2}
          display="grid"
          height="100%"
          gridTemplateRows="auto 1fr auto"
          gridTemplateColumns="1fr 1fr"
          gridTemplateAreas={`"sort          ."
                              "referList     referCard"`}                  
          columnGap={2}
        >
          <Box sx={{ gridArea: "sort" }} my={1}>
            {renderMenu}
          </Box>
          <Box sx={{ gridArea: "referList" }} overflow="auto">
            {data?.data?.map((referral) => (
              <ReferralPreviewCard onClick={() => setselectedReferral(referral)} referral={referral} />
            ))} 
                     
          </Box>
          <Box sx={{ gridArea: "referCard" }} overflow="auto">
            <ReferralCard referral={selectedReferral}/>
          </Box>
        </Box>
      </Box>
    )
}