import {useEffect, useState} from 'react';
import { Box, Typography } from "@mui/material";

import axios from 'axios';
import MyReferrals from './MyReferrals/MyReferrals';

const Profile = () => {

  const [userData, setUserData] = useState({
    email: "",
    id: "",
    firstName: "",
    lastName: "",
    position: "",
    isManager: "",
  });

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

    return (
      <>
        <Typography
         mt={10} mb={2} style={{ fontWeight: 600 }} 
         color="#1E5857" variant="h3">
          MY REFERRALS DASHBOARD
        </Typography>
        <MyReferrals user={userData}/>
      </>  
    )
}

export default Profile