import {useEffect, useState} from 'react';
import Tab from '@mui/material/Tab'
import {Tabs} from '@mui/material'
import axios from 'axios';

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


    const [value, setValue] = useState(-1);
    const handleTab = (event, val) => {
        setValue(val);
    }
    const isAManager = userData.isManager;
    return (
        <>
           <Tabs value={value} onChange={handleTab}>
            <Tab label="My Referrals" value={0} />
            { isAManager && <Tab label="My Positions" value={1} />}
           </Tabs>
           <TabPanel value={value} index={0}>This this where {userData.firstName} {userData.lastName} referrals will show</TabPanel>
           <TabPanel value={value} index={1}>This is where {userData.firstName} {userData.lastName} positions will show</TabPanel>
        </>
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