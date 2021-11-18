import {useEffect, useState} from 'react';
import axios from 'axios';


export default function MyReferrals(props){
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
    return(
        <>This is where {userData.firstName} {userData.lastName} referrals will go</>
    )
}