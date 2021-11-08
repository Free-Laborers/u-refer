//import { Typography } from '@mui/material'
import React, {useEffect, useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
//import ToggleButton from '@mui/material/ToggleButton'
import Tab from '@mui/material/Tab'
import {Tabs} from '@mui/material'

const theme = createTheme({
    palette: {
      primary: {
        main: "#1E5857",
      },
      secondary: {
        main: "#E5E5E5",
      },
    },
  });


  //https://stackoverflow.com/questions/66012476/how-to-show-hide-mui-tabs-based-on-a-condition-and-maintain-the-right-tab-index

const Profile = () => {

  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    position: "",
    isManager: "",
  });


  useEffect(() => {
    async function getData() {
      const auth = localStorage.getItem('authorization');

      if (auth) {
        const myHeaders = new Headers();
        myHeaders.append('authorization', auth);

        const response = await fetch("http://127.0.0.1:5000/employee/profile", {
          method: 'GET',
          headers: myHeaders
        });

        if (response.ok) {
          const json = await response.json();
          return setUserData(json.user);
        }
      }
    }

    getData();
  }, []);


    const [value, setValue] = useState(-1);
    const handleTab = (event, val) => {
        setValue(val);
    }
    const isAManager = userData.isManager;
    return (
        <ThemeProvider theme={theme}>
           <Tabs value={value} onChange={handleTab}>
            <Tab label="My Referrals" value={0} />
            { isAManager && <Tab label="My Positions" value={1} />}
           </Tabs>
           <TabPanel value={value} index={0}>This this where {userData.firstName} {userData.lastName} referrals will show</TabPanel>
           <TabPanel value={value} index={1}>This is where {userData.firstName} {userData.lastName} positions will show</TabPanel>
        </ThemeProvider>
         // <Typography variant='h1'>Profile Page</Typography>
    )
}

//https://www.youtube.com/watch?v=_i49HTOacvI && https://www.youtube.com/watch?v=nF9q_fRV-1A
function TabPanel(props){
    const {children, value, index}=props;
    return(
        <div>
        {
            value===index && (<h1>{children}</h1>)
        }
        </div>
    )
}

export default Profile