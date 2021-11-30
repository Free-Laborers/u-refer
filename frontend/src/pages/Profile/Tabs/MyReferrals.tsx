import { useEffect, useState } from "react";
import axios from "axios";
import useAxios from "axios-hooks";
//@ts-ignore
import { Referral } from "../../../../../backend/node_modules/prisma/prisma-client";
import { Typography } from "@mui/material";

interface ReferralResponseType {
  data: Referral[];
}
export default function MyReferrals(props) {
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    position: "",
    isManager: "",
  });

  const [{ data }] = useAxios<ReferralResponseType>({
    url: "/referral/user",
    headers: {
      Authorization: localStorage.getItem("authorization"),
    },
  });

  useEffect(() => {
    async function getData() {
      const auth = localStorage.getItem("authorization");

      if (auth) {
        try {
          const response = await axios("/employee/profile", {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("authorization"),
            },
          });
          const json = await response.data;
          return setUserData(json.user);
        } catch (err) {
          console.error(err);
        }
      }
    }

    getData();
  }, []);
  return (
    <>
      <Typography>
        This is where {userData.firstName} {userData.lastName}'s referrals will
        go
      </Typography>
      <Typography>{JSON.stringify(data)}</Typography>
    </>
  );
}
